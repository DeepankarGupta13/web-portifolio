import { Object3D  } from "three";
export default class RotationManager extends Object3D{
    constructor(camera, domElement) {
        super();

        if (domElement === undefined) {

            console.warn('THREE.TransformControls: The second parameter "domElement" is now mandatory.');
            domElement = document;

        }

        // gizmo Controls
        const _gizmo = new TransformControlsGizmo();
        this._gizmo = _gizmo;
        this.add(_gizmo);

        const _plane = new TransformControlsPlane();
        this._plane = _plane;
        this.add(_plane);

        // Defined getter, setter and store for a property
        function defineProperty(propName, defaultValue) {

            let propValue = defaultValue;

            Object.defineProperty(scope, propName, {

                get: function () {

                    return propValue !== undefined ? propValue : defaultValue;

                },

                set: function (value) {

                    if (propValue !== value) {

                        propValue = value;
                        _plane[propName] = value;
                        _gizmo[propName] = value;

                        scope.dispatchEvent({ type: propName + '-changed', value: value });
                        scope.dispatchEvent(_changeEvent);

                    }

                }

            });

            scope[propName] = defaultValue;
            _plane[propName] = defaultValue;
            _gizmo[propName] = defaultValue;

        }

        defineProperty('camera', camera);
        defineProperty('object', undefined);
        defineProperty('enabled', true);
        defineProperty('axis', null);
        defineProperty('mode', 'translate');
        defineProperty('translationSnap', null);
        defineProperty('rotationSnap', null);
        defineProperty('scaleSnap', null);
        defineProperty('space', 'world');
        defineProperty('size', 1);
        defineProperty('dragging', false);
        defineProperty('showX', true);
        defineProperty('showY', true);
        defineProperty('showZ', true);

        const worldPosition = new Vector3();
        const worldPositionStart = new Vector3();
        const worldQuaternion = new Quaternion();
        const worldQuaternionStart = new Quaternion();
        const cameraPosition = new Vector3();
        const cameraQuaternion = new Quaternion();
        const pointStart = new Vector3();
        const pointEnd = new Vector3();
        const rotationAxis = new Vector3();
        const rotationAngle = 0;
        const eye = new Vector3();

        // TODO: remove properties unused in plane and gizmo

        defineProperty('worldPosition', worldPosition);
        defineProperty('worldPositionStart', worldPositionStart);
        defineProperty('worldQuaternion', worldQuaternion);
        defineProperty('worldQuaternionStart', worldQuaternionStart);
        defineProperty('cameraPosition', cameraPosition);
        defineProperty('cameraQuaternion', cameraQuaternion);
        defineProperty('pointStart', pointStart);
        defineProperty('pointEnd', pointEnd);
        defineProperty('rotationAxis', rotationAxis);
        defineProperty('rotationAngle', rotationAngle);
        defineProperty('eye', eye);

        this._offset = new Vector3();
        this._startNorm = new Vector3();
        this._endNorm = new Vector3();
        this._cameraScale = new Vector3();

        this._parentPosition = new Vector3();
        this._parentQuaternion = new Quaternion();
        this._parentQuaternionInv = new Quaternion();
        this._parentScale = new Vector3();

        this._worldScaleStart = new Vector3();
        this._worldQuaternionInv = new Quaternion();
        this._worldScale = new Vector3();

        this._positionStart = new Vector3();
        this._quaternionStart = new Quaternion();
        this._scaleStart = new Vector3();

        this._getPointer = getPointer.bind(this);
        this._onPointerDown = onPointerDown.bind(this);
        this._onPointerHover = onPointerHover.bind(this);
        this._onPointerMove = onPointerMove.bind(this);
        this._onPointerUp = onPointerUp.bind(this);

        this.domElement.addEventListener('pointerdown', this._onPointerDown);
        this.domElement.addEventListener('pointermove', this._onPointerHover);
        this.domElement.addEventListener('pointerup', this._onPointerUp);
    }

    pointerHover(pointer) {

        if (this.object === undefined || this.dragging === true) return;

        _raycaster.setFromCamera(pointer, this.camera);

        const intersect = intersectObjectWithRay(this._gizmo.picker[this.mode], _raycaster);

        if (intersect) {

            this.axis = intersect.object.name;

        } else {

            this.axis = null;

        }

    }

    pointerDown(pointer) {

        if (this.object === undefined || this.dragging === true || pointer.button !== 0) return;

        if (this.axis !== null) {

            _raycaster.setFromCamera(pointer, this.camera);

            const planeIntersect = intersectObjectWithRay(this._plane, _raycaster, true);

            if (planeIntersect) {

                this.object.updateMatrixWorld();
                this.object.parent.updateMatrixWorld();

                this._positionStart.copy(this.object.position);
                this._quaternionStart.copy(this.object.quaternion);
                this._scaleStart.copy(this.object.scale);

                this.object.matrixWorld.decompose(this.worldPositionStart, this.worldQuaternionStart, this._worldScaleStart);

                this.pointStart.copy(planeIntersect.point).sub(this.worldPositionStart);

            }

            this.dragging = true;
            _mouseDownEvent.mode = this.mode;
            this.dispatchEvent(_mouseDownEvent);

        }

    }
}

class TransformControlsGizmo extends Object3D {
    constructor() {
        super();

        const gizmoMaterial = new MeshBasicMaterial({
            depthTest: false,
            depthWrite: false,
            fog: false,
            toneMapped: false,
            transparent: true
        });

        const matGreen = gizmoMaterial.clone();
        matGreen.color.setHex(0x00ff00);

        function CircleGeometry(radius, arc) {

            const geometry = new TorusGeometry(radius, 0.0075, 3, 64, arc * Math.PI * 2);
            geometry.rotateY(Math.PI / 2);
            geometry.rotateX(Math.PI / 2);
            return geometry;
        }

        const gizmoRotate = {
            Y: [
                [new Mesh(CircleGeometry(0.5, 0.5), matGreen), null, [0, 0, - Math.PI / 2]]
            ],
        };

        function setupGizmo(gizmoMap) {

            const gizmo = new Object3D();

            for (const name in gizmoMap) {

                for (let i = gizmoMap[name].length; i--;) {

                    const object = gizmoMap[name][i][0].clone();
                    const position = gizmoMap[name][i][1];
                    const rotation = gizmoMap[name][i][2];
                    const scale = gizmoMap[name][i][3];
                    const tag = gizmoMap[name][i][4];

                    // name and tag properties are essential for picking and updating logic.
                    object.name = name;
                    object.tag = tag;

                    if (position) {

                        object.position.set(position[0], position[1], position[2]);

                    }

                    if (rotation) {

                        object.rotation.set(rotation[0], rotation[1], rotation[2]);

                    }

                    if (scale) {

                        object.scale.set(scale[0], scale[1], scale[2]);

                    }

                    object.updateMatrix();

                    const tempGeometry = object.geometry.clone();
                    tempGeometry.applyMatrix4(object.matrix);
                    object.geometry = tempGeometry;
                    object.renderOrder = Infinity;

                    object.position.set(0, 0, 0);
                    object.rotation.set(0, 0, 0);
                    object.scale.set(1, 1, 1);

                    gizmo.add(object);

                }

            }

            return gizmo;

        }

        this.add(this.gizmo['rotate'] = setupGizmo(gizmoRotate));

    }
}

class TransformControlsPlane extends Mesh {

	constructor() {

		super(
			new PlaneGeometry( 100000, 100000, 2, 2 ),
			new MeshBasicMaterial( { visible: false, wireframe: true, side: DoubleSide, transparent: true, opacity: 0.1, toneMapped: false } )
		);

		this.isTransformControlsPlane = true;

		this.type = 'TransformControlsPlane';

	}
}
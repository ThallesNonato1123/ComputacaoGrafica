class Robot {
    constructor(render, ...sizes) {
        this.render = render;
        this._transparentMode = false;

        this._bodySizes = [...sizes];

        this._material = new THREE.MeshBasicMaterial({ color });
        this._edgesMaterial = new THREE.LineBasicMaterial({ color: edgesColor });

        this._createBody();
        this._addRotationToParts();
    }

    set transparentMode(value) {
        this._transparentMode = value;
    }

    _getInitialPosition(sizeA, sizeB) {
        return (sizeA / 2) + (sizeB / 2);
    }

    _createPart(sizes) {
        const geometry = new THREE.BoxGeometry(...sizes);

        const part = new THREE.Mesh(geometry, this._material);

        const edges = new THREE.EdgesGeometry(geometry);
        const lines = new THREE.LineSegments(edges, this._edgesMaterial);

        part.add(lines)

        return this._transparentMode ? lines : part;
    }
    
    _createPivot(parent, child, x, y, z) {
        const pivot = new THREE.Group();
        pivot.position.set(0.0, 0.0, 0);
        parent.add(pivot);
        pivot.add(child);

        pivot.position.x = x;
        pivot.position.y = y;
        pivot.position.z = z;

        return pivot;
    }

    _createBody() {
        this.body = this._createPart(this._bodySizes);

        this._createHead();
        this._createArms();
        this._createLegs();
    }

    _createHead() {
        this._headSizes = [
            this._bodySizes[0] / 1.5,
            this._bodySizes[1] / 2,
            this._bodySizes[2] / 1.5
        ]

        const head = this._createPart(this._headSizes);

        const y = this._getInitialPosition(this._headSizes[1], this._bodySizes[1]);

        head.position.y = y;

        this.body.add(head);

        this.head = head;
    }

    _createArms() {
        this._armSizes = [
            this._bodySizes[0] / 4,
            this._bodySizes[1] / 2.5,
            this._bodySizes[2] / 2
        ]

        const armL = this._createPart(this._armSizes);
        const armR = this._createPart(this._armSizes);

        const x = this._getInitialPosition(this._armSizes[0], this._bodySizes[0]);
        const y = this._armSizes[1] / 1.5;

        armL.position.x = -x;
        armL.position.y = y;

        armR.position.x = x;
        armR.position.y = y;

        this.body.add(armL);
        this.body.add(armR);

        this.arms = {
            left: armL,
            right: armR,
            pivots: {
                left: null,
                right: null
            }
        }

        this._createForearms();
    }

    _createForearms() {
        this._forearmSizes = [...this._armSizes]
        this._forearmSizes[1] += this._forearmSizes[1] / 2;

        const forearmL = this._createPart(this._forearmSizes);
        const forearmR = this._createPart(this._forearmSizes);

        this.arms.left.add(forearmL);
        this.arms.right.add(forearmR);

        const pivotX = 0;
        const pivotY = -(this._armSizes[1] / 2);
        const pivotZ = this._armSizes[2] / 2;

        this.arms.pivots.left = this._createPivot(this.arms.left, forearmL, pivotX, pivotY, pivotZ);
        this.arms.pivots.right = this._createPivot(this.arms.right, forearmR, pivotX, pivotY, pivotZ);
        
        forearmL.position.y = -(this._forearmSizes[1] / 2);
        forearmL.position.z = -(this._forearmSizes[2] / 2);

        forearmR.position.y = -(this._forearmSizes[1] / 2);
        forearmR.position.z = -(this._forearmSizes[2] / 2);

        this.forearms = {
            left: forearmL,
            right: forearmR
        }

        this._createHands()
    }

    _createHands() {
        this._handSizes = [
            this._forearmSizes[0] / 3,
            this._forearmSizes[1] / 2,
            this._forearmSizes[2] + this._forearmSizes[2] / 2
        ]

        const handL = this._createPart(this._handSizes);
        const handR = this._createPart(this._handSizes);

        const y = -(this._getInitialPosition(this._handSizes[1], this._forearmSizes[1]));

        handL.position.y = y;
        handR.position.y = y;

        this.forearms.left.add(handL);
        this.forearms.right.add(handR);

        this.hands = {
            left: handL,
            right: handR
        }
    }

    _createLegs() {
        this._legSizes = [
            this._bodySizes[0] / 3,
            this._bodySizes[1] / 2,
            this._bodySizes[2],
        ]

        const legL = this._createPart(this._legSizes);
        const legR = this._createPart(this._legSizes);

        const x = this._legSizes[0]
        const y = -(this._getInitialPosition(this._legSizes[1], this._bodySizes[1]));

        legL.position.x = -x;
        legL.position.y = y;

        legR.position.x = x;
        legR.position.y = y;

        this.body.add(legL);
        this.body.add(legR);

        this.legs = {
            left: legL,
            right: legR,
            pivots: {
                left: null,
                right: null
            }
        }

        this._createCalfs();
    }

    _createCalfs() {
        this._calfSizes = [...this._legSizes]
        this._calfSizes[1] += this._calfSizes[1] / 4

        const calfL = this._createPart(this._calfSizes);
        const calfR = this._createPart(this._calfSizes);

        this.legs.left.add(calfL);
        this.legs.right.add(calfR);

        const pivotX = 0;
        const pivotY = -(this._legSizes[1] / 2);
        const pivotZ = this._legSizes[2] / 2;

        this.legs.pivots.left = this._createPivot(this.legs.left, calfL, pivotX, pivotY, pivotZ);
        this.legs.pivots.right = this._createPivot(this.legs.right, calfR, pivotX, pivotY, pivotZ);
        
        calfL.position.y = -(this._calfSizes[1] / 2);
        calfL.position.z = -(this._calfSizes[2] / 2);

        calfR.position.y = -(this._calfSizes[1] / 2);
        calfR.position.z = -(this._calfSizes[2] / 2);

        this.calfs = {
            left: calfL,
            right: calfR
        }

        this._createFoots();
    }

    _createFoots() {
        this._footSizes = [
            this._legSizes[0],
            this._legSizes[1] / 4,
            this._legSizes[2] + this._legSizes[2] / 2
        ]

        const footL = this._createPart(this._footSizes);
        const footR = this._createPart(this._footSizes);

        const y = -(this._getInitialPosition(this._footSizes[1], this._calfSizes[1]));
        const z = this._footSizes[2] / 6;

        footL.position.y = y;
        footL.position.z = z;

        footR.position.y = y;
        footR.position.z = z;

        this.calfs.left.add(footL);
        this.calfs.right.add(footR);

        this.foots = {
            left: footL,
            right: footR
        }
    }

    _rotatePart(part, axis, amount) {
        part.rotation[axis] += amount;
        this.render();
    }

    _addRotationToParts() {
        this.body.rotate = (axis, amount) => this._rotatePart(this.body, axis, amount)
        this.head.rotate = (axis, amount) => this._rotatePart(this.head, axis, amount)

        for (const key in this.arms) {
            const arm = this.arms[key];
            arm.rotate = (axis, amount) => this._rotatePart(arm, axis, amount)
        }


        for (const key in this.forearms) {
            const forearm = this.forearms[key];
            const forearmPivot = this.arms.pivots[key];
            forearm.rotate = (axis, amount) => this._rotatePart(forearmPivot, axis, amount)
        }

        for (const key in this.hands) {
            const hand = this.hands[key];
            hand.rotate = (axis, amount) => this._rotatePart(hand, axis, amount)
        }

        for (const key in this.legs) {
            const leg = this.legs[key];
            leg.rotate = (axis, amount) => this._rotatePart(leg, axis, amount)
        }

        for (const key in this.calfs) {
            const calf = this.calfs[key];
            const calfPivot = this.legs.pivots[key];
            calf.rotate = (axis, amount) => this._rotatePart(calfPivot, axis, amount)
        }

        for (const key in this.foots) {
            const foot = this.foots[key];
            foot.rotate = (axis, amount) => this._rotatePart(foot, axis, amount)
        }
    }
}
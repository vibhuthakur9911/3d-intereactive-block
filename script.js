let el = document.getElementById('transform'),
            css = document.getElementById('css'),
            width = el.clientWidth,
            height = el.clientHeight,
            perspective = 500,
            rotateX = 0,
            rotateY = 0,
            scale = 100,
            isDown = false,
            reverse = false,
            lastX,
            lastY;

        function scaleVal() {
            let strScale = scale.toString();
            if (scale >= 100) {
                return parseFloat(strScale[0] + '.' + strScale.slice(1));
            }
            return parseFloat('0.' + strScale);
        }

        function updateTransform() {
            let pProp = 'perspective(' + perspective + 'px)',
                xProp = 'rotateX(' + rotateX + 'deg)',
                yProp = 'rotateY(' + rotateY + 'deg)',
                sProp = 'scale(' + scaleVal() + ')',
                props = [pProp, xProp, yProp, sProp].join(' ');
            el.style[Modernizr.prefixed('transform')] = props;
            css.innerText = props;
        }

        function wheel(e) {
            e.preventDefault();
            let delta = e.wheelDelta || -e.detail;
            scale += delta > 0 ? 5 : -5;
            updateTransform();
        }

        el.addEventListener('mousedown', function (e) {
            isDown = true;
            lastX = e.clientX;
            lastY = e.clientY;
        }, false);

        el.addEventListener('mousewheel', wheel, false);
        el.addEventListener('DOMMouseScroll', wheel, false);

        document.addEventListener('mousemove', function (e) {
            if (isDown) {
                xMultiplier = 180 / height / scaleVal();
                yMultiplier = 180 / width / scaleVal();
                rotateX += (lastY - e.clientY) * xMultiplier;
                rotateY += (lastX - e.clientX) * yMultiplier * (reverse ? 1 : -1);
                rotateX = Math.floor(rotateX % 360);
                rotateY = Math.floor(rotateY % 360);
                reverse = Math.abs(Math.floor(rotateX / 90) % 4) > 1;
                lastX = e.clientX;
                lastY = e.clientY;
                updateTransform();
            }
        }, false);

        document.addEventListener('mouseup', function () {
            isDown = false;
        }, false);
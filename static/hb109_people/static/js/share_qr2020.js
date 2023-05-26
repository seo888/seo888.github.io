var qrcode = function () {
    var qrcode = function (typeNumber, errorCorrectLevel) {
        var PAD0 = 0xEC;
        var PAD1 = 0x11;
        var _typeNumber = typeNumber;
        var _errorCorrectLevel = QRErrorCorrectLevel[errorCorrectLevel];
        var _modules = null;
        var _moduleCount = 0;
        var _dataCache = null;
        var _dataList = new Array();
        var _this = {};
        var makeImpl = function (test, maskPattern) {
            _moduleCount = _typeNumber * 4 + 17;
            _modules = function (moduleCount) {
                var modules = new Array(moduleCount);
                for (var row = 0; row < moduleCount; row += 1) {
                    modules[row] = new Array(moduleCount);
                    for (var col = 0; col < moduleCount; col += 1) {
                        modules[row][col] = null;
                    }
                }
                return modules;
            }(_moduleCount);

            setupPositionProbePattern(0, 0);
            setupPositionProbePattern(_moduleCount - 7, 0);
            setupPositionProbePattern(0, _moduleCount - 7);
            setupPositionAdjustPattern();
            setupTimingPattern();
            setupTypeInfo(test, maskPattern);

            if (_typeNumber >= 7) {
                setupTypeNumber(test);
            }

            if (_dataCache == null) {
                _dataCache = createData(_typeNumber, _errorCorrectLevel, _dataList);
            }

            mapData(_dataCache, maskPattern);
        };
        var setupPositionProbePattern = function (row, col) {

            for (var r = -1; r <= 7; r += 1) {

                if (row + r <= -1 || _moduleCount <= row + r) continue;

                for (var c = -1; c <= 7; c += 1) {

                    if (col + c <= -1 || _moduleCount <= col + c) continue;

                    if ((0 <= r && r <= 6 && (c == 0 || c == 6))
                        || (0 <= c && c <= 6 && (r == 0 || r == 6))
                        || (2 <= r && r <= 4 && 2 <= c && c <= 4)) {
                        _modules[row + r][col + c] = true;
                    } else {
                        _modules[row + r][col + c] = false;
                    }
                }
            }
        };
        var getBestMaskPattern = function () {

            var minLostPoint = 0;
            var pattern = 0;

            for (var i = 0; i < 8; i += 1) {

                makeImpl(true, i);

                var lostPoint = QRUtil.getLostPoint(_this);

                if (i == 0 || minLostPoint > lostPoint) {
                    minLostPoint = lostPoint;
                    pattern = i;
                }
            }

            return pattern;
        };
        var setupTimingPattern = function () {

            for (var r = 8; r < _moduleCount - 8; r += 1) {
                if (_modules[r][6] != null) {
                    continue;
                }
                _modules[r][6] = (r % 2 == 0);
            }

            for (var c = 8; c < _moduleCount - 8; c += 1) {
                if (_modules[6][c] != null) {
                    continue;
                }
                _modules[6][c] = (c % 2 == 0);
            }
        };
        var setupPositionAdjustPattern = function () {

            var pos = QRUtil.getPatternPosition(_typeNumber);

            for (var i = 0; i < pos.length; i += 1) {

                for (var j = 0; j < pos.length; j += 1) {

                    var row = pos[i];
                    var col = pos[j];

                    if (_modules[row][col] != null) {
                        continue;
                    }

                    for (var r = -2; r <= 2; r += 1) {

                        for (var c = -2; c <= 2; c += 1) {

                            if (r == -2 || r == 2 || c == -2 || c == 2
                                || (r == 0 && c == 0)) {
                                _modules[row + r][col + c] = true;
                            } else {
                                _modules[row + r][col + c] = false;
                            }
                        }
                    }
                }
            }
        };
        var setupTypeNumber = function (test) {

            var bits = QRUtil.getBCHTypeNumber(_typeNumber);

            for (var i = 0; i < 18; i += 1) {
                var mod = (!test && ((bits >> i) & 1) == 1);
                _modules[Math.floor(i / 3)][i % 3 + _moduleCount - 8 - 3] = mod;
            }

            for (var i = 0; i < 18; i += 1) {
                var mod = (!test && ((bits >> i) & 1) == 1);
                _modules[i % 3 + _moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
            }
        };
        var setupTypeInfo = function (test, maskPattern) {

            var data = (_errorCorrectLevel << 3) | maskPattern;
            var bits = QRUtil.getBCHTypeInfo(data);

            // vertical
            for (var i = 0; i < 15; i += 1) {

                var mod = (!test && ((bits >> i) & 1) == 1);

                if (i < 6) {
                    _modules[i][8] = mod;
                } else if (i < 8) {
                    _modules[i + 1][8] = mod;
                } else {
                    _modules[_moduleCount - 15 + i][8] = mod;
                }
            }

            // horizontal
            for (var i = 0; i < 15; i += 1) {

                var mod = (!test && ((bits >> i) & 1) == 1);

                if (i < 8) {
                    _modules[8][_moduleCount - i - 1] = mod;
                } else if (i < 9) {
                    _modules[8][15 - i - 1 + 1] = mod;
                } else {
                    _modules[8][15 - i - 1] = mod;
                }
            }

            // fixed module
            _modules[_moduleCount - 8][8] = (!test);
        };
        var mapData = function (data, maskPattern) {

            var inc = -1;
            var row = _moduleCount - 1;
            var bitIndex = 7;
            var byteIndex = 0;
            var maskFunc = QRUtil.getMaskFunction(maskPattern);

            for (var col = _moduleCount - 1; col > 0; col -= 2) {

                if (col == 6) col -= 1;

                while (true) {

                    for (var c = 0; c < 2; c += 1) {

                        if (_modules[row][col - c] == null) {

                            var dark = false;

                            if (byteIndex < data.length) {
                                dark = (((data[byteIndex] >>> bitIndex) & 1) == 1);
                            }

                            var mask = maskFunc(row, col - c);

                            if (mask) {
                                dark = !dark;
                            }

                            _modules[row][col - c] = dark;
                            bitIndex -= 1;

                            if (bitIndex == -1) {
                                byteIndex += 1;
                                bitIndex = 7;
                            }
                        }
                    }

                    row += inc;

                    if (row < 0 || _moduleCount <= row) {
                        row -= inc;
                        inc = -inc;
                        break;
                    }
                }
            }
        };
        var createBytes = function (buffer, rsBlocks) {

            var offset = 0;

            var maxDcCount = 0;
            var maxEcCount = 0;

            var dcdata = new Array(rsBlocks.length);
            var ecdata = new Array(rsBlocks.length);

            for (var r = 0; r < rsBlocks.length; r += 1) {

                var dcCount = rsBlocks[r].dataCount;
                var ecCount = rsBlocks[r].totalCount - dcCount;

                maxDcCount = Math.max(maxDcCount, dcCount);
                maxEcCount = Math.max(maxEcCount, ecCount);

                dcdata[r] = new Array(dcCount);

                for (var i = 0; i < dcdata[r].length; i += 1) {
                    dcdata[r][i] = 0xff & buffer.getBuffer()[i + offset];
                }
                offset += dcCount;

                var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
                var rawPoly = qrPolynomial(dcdata[r], rsPoly.getLength() - 1);

                var modPoly = rawPoly.mod(rsPoly);
                ecdata[r] = new Array(rsPoly.getLength() - 1);
                for (var i = 0; i < ecdata[r].length; i += 1) {
                    var modIndex = i + modPoly.getLength() - ecdata[r].length;
                    ecdata[r][i] = (modIndex >= 0) ? modPoly.getAt(modIndex) : 0;
                }
            }

            var totalCodeCount = 0;
            for (var i = 0; i < rsBlocks.length; i += 1) {
                totalCodeCount += rsBlocks[i].totalCount;
            }

            var data = new Array(totalCodeCount);
            var index = 0;

            for (var i = 0; i < maxDcCount; i += 1) {
                for (var r = 0; r < rsBlocks.length; r += 1) {
                    if (i < dcdata[r].length) {
                        data[index] = dcdata[r][i];
                        index += 1;
                    }
                }
            }

            for (var i = 0; i < maxEcCount; i += 1) {
                for (var r = 0; r < rsBlocks.length; r += 1) {
                    if (i < ecdata[r].length) {
                        data[index] = ecdata[r][i];
                        index += 1;
                    }
                }
            }

            return data;
        };
        var createData = function (typeNumber, errorCorrectLevel, dataList) {

            var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectLevel);

            var buffer = qrBitBuffer();

            for (var i = 0; i < dataList.length; i += 1) {
                var data = dataList[i];
                buffer.put(data.getMode(), 4);
                buffer.put(data.getLength(), QRUtil.getLengthInBits(data.getMode(), typeNumber));
                data.write(buffer);
            }

            // calc num max data.
            var totalDataCount = 0;
            for (var i = 0; i < rsBlocks.length; i += 1) {
                totalDataCount += rsBlocks[i].dataCount;
            }

            if (buffer.getLengthInBits() > totalDataCount * 8) {
                throw new Error('code length overflow. ('
                    + buffer.getLengthInBits()
                    + '>'
                    + totalDataCount * 8
                    + ')');
            }

            // end code
            if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
                buffer.put(0, 4);
            }

            // padding
            while (buffer.getLengthInBits() % 8 != 0) {
                buffer.putBit(false);
            }

            // padding
            while (true) {

                if (buffer.getLengthInBits() >= totalDataCount * 8) {
                    break;
                }
                buffer.put(PAD0, 8);

                if (buffer.getLengthInBits() >= totalDataCount * 8) {
                    break;
                }
                buffer.put(PAD1, 8);
            }

            return createBytes(buffer, rsBlocks);
        };
        _this.addData = function (data) {
            var newData = qr8BitByte(data);
            _dataList.push(newData);
            _dataCache = null;
        };
        _this.isDark = function (row, col) {
            if (row < 0 || _moduleCount <= row || col < 0 || _moduleCount <= col) {
                throw new Error(row + ',' + col);
            }
            return _modules[row][col];
        };
        _this.getModuleCount = function () {
            return _moduleCount;
        };
        _this.make = function () {
            makeImpl(false, getBestMaskPattern());
        };
        _this.createTableTag = function (cellSize, margin) {

            cellSize = cellSize || 2;
            margin = (typeof margin == 'undefined') ? 'auto' : margin;

            var qrHtml = '';

            qrHtml += '<table style="';
            qrHtml += ' border-width: 0px; border-style: none;';
            qrHtml += ' border-collapse: collapse;';
            qrHtml += ' padding: 0px; margin:' + margin + ';';
            qrHtml += '">';
            qrHtml += '<tbody>';

            for (var r = 0; r < _this.getModuleCount(); r += 1) {

                qrHtml += '<tr>';

                for (var c = 0; c < _this.getModuleCount(); c += 1) {
                    qrHtml += '<td style="';
                    qrHtml += ' border-width: 0px; border-style: none;';
                    qrHtml += ' border-collapse: collapse;';
                    qrHtml += ' padding: 0px; margin: 0px;';
                    qrHtml += ' width: ' + cellSize + 'px;';
                    qrHtml += ' height: ' + cellSize + 'px;';
                    qrHtml += ' background-color: ';
                    qrHtml += _this.isDark(r, c) ? '#000000' : '#ffffff';
                    qrHtml += ';';
                    qrHtml += '"/>';
                }

                qrHtml += '</tr>';
            }

            qrHtml += '</tbody>';
            qrHtml += '</table>';

            return qrHtml;
        };
        return _this;
    };
    qrcode.stringToBytes = function (s) {
        var bytes = new Array();
        for (var i = 0; i < s.length; i += 1) {
            var c = s.charCodeAt(i);
            bytes.push(c & 0xff);
        }
        return bytes;
    };
    qrcode.createStringToBytes = function (unicodeData, numChars) {

        // create conversion map.

        var unicodeMap = function () {

            var bin = base64DecodeInputStream(unicodeData);
            var read = function () {
                var b = bin.read();
                if (b == -1) throw new Error();
                return b;
            };

            var count = 0;
            var unicodeMap = {};
            while (true) {
                var b0 = bin.read();
                if (b0 == -1) break;
                var b1 = read();
                var b2 = read();
                var b3 = read();
                var k = String.fromCharCode((b0 << 8) | b1);
                var v = (b2 << 8) | b3;
                unicodeMap[k] = v;
                count += 1;
            }
            if (count != numChars) {
                throw new Error(count + ' != ' + numChars);
            }

            return unicodeMap;
        }();

        var unknownChar = '?'.charCodeAt(0);

        return function (s) {
            var bytes = new Array();
            for (var i = 0; i < s.length; i += 1) {
                var c = s.charCodeAt(i);
                if (c < 128) {
                    bytes.push(c);
                } else {
                    var b = unicodeMap[s.charAt(i)];
                    if (typeof b == 'number') {
                        if ((b & 0xff) == b) {
                            // 1byte
                            bytes.push(b);
                        } else {
                            // 2bytes
                            bytes.push(b >>> 8);
                            bytes.push(b & 0xff);
                        }
                    } else {
                        bytes.push(unknownChar);
                    }
                }
            }
            return bytes;
        };
    };
    var QRMode = {
        MODE_NUMBER: 1 << 0,
        MODE_ALPHA_NUM: 1 << 1,
        MODE_8BIT_BYTE: 1 << 2,
        MODE_KANJI: 1 << 3
    };
    var QRErrorCorrectLevel = {
        L: 1,
        M: 0,
        Q: 3,
        H: 2
    };
    var QRMaskPattern = {
        PATTERN000: 0,
        PATTERN001: 1,
        PATTERN010: 2,
        PATTERN011: 3,
        PATTERN100: 4,
        PATTERN101: 5,
        PATTERN110: 6,
        PATTERN111: 7
    };
    var QRUtil = function () {

        var PATTERN_POSITION_TABLE = [
            [],
            [6, 18],
            [6, 22],
            [6, 26],
            [6, 30],
            [6, 34],
            [6, 22, 38],
            [6, 24, 42],
            [6, 26, 46],
            [6, 28, 50],
            [6, 30, 54],
            [6, 32, 58],
            [6, 34, 62],
            [6, 26, 46, 66],
            [6, 26, 48, 70],
            [6, 26, 50, 74],
            [6, 30, 54, 78],
            [6, 30, 56, 82],
            [6, 30, 58, 86],
            [6, 34, 62, 90],
            [6, 28, 50, 72, 94],
            [6, 26, 50, 74, 98],
            [6, 30, 54, 78, 102],
            [6, 28, 54, 80, 106],
            [6, 32, 58, 84, 110],
            [6, 30, 58, 86, 114],
            [6, 34, 62, 90, 118],
            [6, 26, 50, 74, 98, 122],
            [6, 30, 54, 78, 102, 126],
            [6, 26, 52, 78, 104, 130],
            [6, 30, 56, 82, 108, 134],
            [6, 34, 60, 86, 112, 138],
            [6, 30, 58, 86, 114, 142],
            [6, 34, 62, 90, 118, 146],
            [6, 30, 54, 78, 102, 126, 150],
            [6, 24, 50, 76, 102, 128, 154],
            [6, 28, 54, 80, 106, 132, 158],
            [6, 32, 58, 84, 110, 136, 162],
            [6, 26, 54, 82, 110, 138, 166],
            [6, 30, 58, 86, 114, 142, 170]
        ];
        var G15 = (1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0);
        var G18 = (1 << 12) | (1 << 11) | (1 << 10) | (1 << 9) | (1 << 8) | (1 << 5) | (1 << 2) | (1 << 0);
        var G15_MASK = (1 << 14) | (1 << 12) | (1 << 10) | (1 << 4) | (1 << 1);

        var _this = {};

        var getBCHDigit = function (data) {
            var digit = 0;
            while (data != 0) {
                digit += 1;
                data >>>= 1;
            }
            return digit;
        };

        _this.getBCHTypeInfo = function (data) {
            var d = data << 10;
            while (getBCHDigit(d) - getBCHDigit(G15) >= 0) {
                d ^= (G15 << (getBCHDigit(d) - getBCHDigit(G15)));
            }
            return ((data << 10) | d) ^ G15_MASK;
        };

        _this.getBCHTypeNumber = function (data) {
            var d = data << 12;
            while (getBCHDigit(d) - getBCHDigit(G18) >= 0) {
                d ^= (G18 << (getBCHDigit(d) - getBCHDigit(G18)));
            }
            return (data << 12) | d;
        };

        _this.getPatternPosition = function (typeNumber) {
            return PATTERN_POSITION_TABLE[typeNumber - 1];
        };

        _this.getMaskFunction = function (maskPattern) {

            switch (maskPattern) {

                case QRMaskPattern.PATTERN000:
                    return function (i, j) { return (i + j) % 2 == 0; };
                case QRMaskPattern.PATTERN001:
                    return function (i, j) { return i % 2 == 0; };
                case QRMaskPattern.PATTERN010:
                    return function (i, j) { return j % 3 == 0; };
                case QRMaskPattern.PATTERN011:
                    return function (i, j) { return (i + j) % 3 == 0; };
                case QRMaskPattern.PATTERN100:
                    return function (i, j) { return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 == 0; };
                case QRMaskPattern.PATTERN101:
                    return function (i, j) { return (i * j) % 2 + (i * j) % 3 == 0; };
                case QRMaskPattern.PATTERN110:
                    return function (i, j) { return ((i * j) % 2 + (i * j) % 3) % 2 == 0; };
                case QRMaskPattern.PATTERN111:
                    return function (i, j) { return ((i * j) % 3 + (i + j) % 2) % 2 == 0; };

                default:
                    throw new Error('bad maskPattern:' + maskPattern);
            }
        };

        _this.getErrorCorrectPolynomial = function (errorCorrectLength) {
            var a = qrPolynomial([1], 0);
            for (var i = 0; i < errorCorrectLength; i += 1) {
                a = a.multiply(qrPolynomial([1, QRMath.gexp(i)], 0));
            }
            return a;
        };

        _this.getLengthInBits = function (mode, type) {

            if (1 <= type && type < 10) {

                // 1 - 9

                switch (mode) {
                    case QRMode.MODE_NUMBER: return 10;
                    case QRMode.MODE_ALPHA_NUM: return 9;
                    case QRMode.MODE_8BIT_BYTE: return 8;
                    case QRMode.MODE_KANJI: return 8;
                    default:
                        throw new Error('mode:' + mode);
                }

            } else if (type < 27) {

                // 10 - 26

                switch (mode) {
                    case QRMode.MODE_NUMBER: return 12;
                    case QRMode.MODE_ALPHA_NUM: return 11;
                    case QRMode.MODE_8BIT_BYTE: return 16;
                    case QRMode.MODE_KANJI: return 10;
                    default:
                        throw new Error('mode:' + mode);
                }

            } else if (type < 41) {

                // 27 - 40

                switch (mode) {
                    case QRMode.MODE_NUMBER: return 14;
                    case QRMode.MODE_ALPHA_NUM: return 13;
                    case QRMode.MODE_8BIT_BYTE: return 16;
                    case QRMode.MODE_KANJI: return 12;
                    default:
                        throw new Error('mode:' + mode);
                }

            } else {
                throw new Error('type:' + type);
            }
        };

        _this.getLostPoint = function (qrcode) {

            var moduleCount = qrcode.getModuleCount();

            var lostPoint = 0;

            // LEVEL1

            for (var row = 0; row < moduleCount; row += 1) {
                for (var col = 0; col < moduleCount; col += 1) {

                    var sameCount = 0;
                    var dark = qrcode.isDark(row, col);

                    for (var r = -1; r <= 1; r += 1) {

                        if (row + r < 0 || moduleCount <= row + r) {
                            continue;
                        }

                        for (var c = -1; c <= 1; c += 1) {

                            if (col + c < 0 || moduleCount <= col + c) {
                                continue;
                            }

                            if (r == 0 && c == 0) {
                                continue;
                            }

                            if (dark == qrcode.isDark(row + r, col + c)) {
                                sameCount += 1;
                            }
                        }
                    }

                    if (sameCount > 5) {
                        lostPoint += (3 + sameCount - 5);
                    }
                }
            };

            // LEVEL2

            for (var row = 0; row < moduleCount - 1; row += 1) {
                for (var col = 0; col < moduleCount - 1; col += 1) {
                    var count = 0;
                    if (qrcode.isDark(row, col)) count += 1;
                    if (qrcode.isDark(row + 1, col)) count += 1;
                    if (qrcode.isDark(row, col + 1)) count += 1;
                    if (qrcode.isDark(row + 1, col + 1)) count += 1;
                    if (count == 0 || count == 4) {
                        lostPoint += 3;
                    }
                }
            }

            // LEVEL3

            for (var row = 0; row < moduleCount; row += 1) {
                for (var col = 0; col < moduleCount - 6; col += 1) {
                    if (qrcode.isDark(row, col)
                        && !qrcode.isDark(row, col + 1)
                        && qrcode.isDark(row, col + 2)
                        && qrcode.isDark(row, col + 3)
                        && qrcode.isDark(row, col + 4)
                        && !qrcode.isDark(row, col + 5)
                        && qrcode.isDark(row, col + 6)) {
                        lostPoint += 40;
                    }
                }
            }

            for (var col = 0; col < moduleCount; col += 1) {
                for (var row = 0; row < moduleCount - 6; row += 1) {
                    if (qrcode.isDark(row, col)
                        && !qrcode.isDark(row + 1, col)
                        && qrcode.isDark(row + 2, col)
                        && qrcode.isDark(row + 3, col)
                        && qrcode.isDark(row + 4, col)
                        && !qrcode.isDark(row + 5, col)
                        && qrcode.isDark(row + 6, col)) {
                        lostPoint += 40;
                    }
                }
            }

            // LEVEL4

            var darkCount = 0;

            for (var col = 0; col < moduleCount; col += 1) {
                for (var row = 0; row < moduleCount; row += 1) {
                    if (qrcode.isDark(row, col)) {
                        darkCount += 1;
                    }
                }
            }

            var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
            lostPoint += ratio * 10;

            return lostPoint;
        };

        return _this;
    }();
    var QRMath = function () {

        var EXP_TABLE = new Array(256);
        var LOG_TABLE = new Array(256);

        // initialize tables
        for (var i = 0; i < 8; i += 1) {
            EXP_TABLE[i] = 1 << i;
        }
        for (var i = 8; i < 256; i += 1) {
            EXP_TABLE[i] = EXP_TABLE[i - 4]
                ^ EXP_TABLE[i - 5]
                ^ EXP_TABLE[i - 6]
                ^ EXP_TABLE[i - 8];
        }
        for (var i = 0; i < 255; i += 1) {
            LOG_TABLE[EXP_TABLE[i]] = i;
        }

        var _this = {};

        _this.glog = function (n) {

            if (n < 1) {
                throw new Error('glog(' + n + ')');
            }

            return LOG_TABLE[n];
        };

        _this.gexp = function (n) {

            while (n < 0) {
                n += 255;
            }

            while (n >= 256) {
                n -= 255;
            }

            return EXP_TABLE[n];
        };

        return _this;
    }();
    function qrPolynomial(num, shift) {

        if (typeof num.length == 'undefined') {
            throw new Error(num.length + '/' + shift);
        }

        var _num = function () {
            var offset = 0;
            while (offset < num.length && num[offset] == 0) {
                offset += 1;
            }
            var _num = new Array(num.length - offset + shift);
            for (var i = 0; i < num.length - offset; i += 1) {
                _num[i] = num[i + offset];
            }
            return _num;
        }();

        var _this = {};

        _this.getAt = function (index) {
            return _num[index];
        };

        _this.getLength = function () {
            return _num.length;
        };

        _this.multiply = function (e) {

            var num = new Array(_this.getLength() + e.getLength() - 1);

            for (var i = 0; i < _this.getLength(); i += 1) {
                for (var j = 0; j < e.getLength(); j += 1) {
                    num[i + j] ^= QRMath.gexp(QRMath.glog(_this.getAt(i)) + QRMath.glog(e.getAt(j)));
                }
            }

            return qrPolynomial(num, 0);
        };

        _this.mod = function (e) {

            if (_this.getLength() - e.getLength() < 0) {
                return _this;
            }

            var ratio = QRMath.glog(_this.getAt(0)) - QRMath.glog(e.getAt(0));

            var num = new Array(_this.getLength());
            for (var i = 0; i < _this.getLength(); i += 1) {
                num[i] = _this.getAt(i);
            }

            for (var i = 0; i < e.getLength(); i += 1) {
                num[i] ^= QRMath.gexp(QRMath.glog(e.getAt(i)) + ratio);
            }

            // recursive call
            return qrPolynomial(num, 0).mod(e);
        };

        return _this;
    };
    var QRRSBlock = function () {

        var RS_BLOCK_TABLE = [

            // L
            // M
            // Q
            // H

            // 1
            [1, 26, 19],
            [1, 26, 16],
            [1, 26, 13],
            [1, 26, 9],

            // 2
            [1, 44, 34],
            [1, 44, 28],
            [1, 44, 22],
            [1, 44, 16],

            // 3
            [1, 70, 55],
            [1, 70, 44],
            [2, 35, 17],
            [2, 35, 13],

            // 4
            [1, 100, 80],
            [2, 50, 32],
            [2, 50, 24],
            [4, 25, 9],

            // 5
            [1, 134, 108],
            [2, 67, 43],
            [2, 33, 15, 2, 34, 16],
            [2, 33, 11, 2, 34, 12],

            // 6
            [2, 86, 68],
            [4, 43, 27],
            [4, 43, 19],
            [4, 43, 15],

            // 7
            [2, 98, 78],
            [4, 49, 31],
            [2, 32, 14, 4, 33, 15],
            [4, 39, 13, 1, 40, 14],

            // 8
            [2, 121, 97],
            [2, 60, 38, 2, 61, 39],
            [4, 40, 18, 2, 41, 19],
            [4, 40, 14, 2, 41, 15],

            // 9
            [2, 146, 116],
            [3, 58, 36, 2, 59, 37],
            [4, 36, 16, 4, 37, 17],
            [4, 36, 12, 4, 37, 13],

            // 10
            [2, 86, 68, 2, 87, 69],
            [4, 69, 43, 1, 70, 44],
            [6, 43, 19, 2, 44, 20],
            [6, 43, 15, 2, 44, 16],

            // 11
            [4, 101, 81],
            [1, 80, 50, 4, 81, 51],
            [4, 50, 22, 4, 51, 23],
            [3, 36, 12, 8, 37, 13],

            // 12
            [2, 116, 92, 2, 117, 93],
            [6, 58, 36, 2, 59, 37],
            [4, 46, 20, 6, 47, 21],
            [7, 42, 14, 4, 43, 15],

            // 13
            [4, 133, 107],
            [8, 59, 37, 1, 60, 38],
            [8, 44, 20, 4, 45, 21],
            [12, 33, 11, 4, 34, 12],

            // 14
            [3, 145, 115, 1, 146, 116],
            [4, 64, 40, 5, 65, 41],
            [11, 36, 16, 5, 37, 17],
            [11, 36, 12, 5, 37, 13],

            // 15
            [5, 109, 87, 1, 110, 88],
            [5, 65, 41, 5, 66, 42],
            [5, 54, 24, 7, 55, 25],
            [11, 36, 12, 7, 37, 13],

            // 16
            [5, 122, 98, 1, 123, 99],
            [7, 73, 45, 3, 74, 46],
            [15, 43, 19, 2, 44, 20],
            [3, 45, 15, 13, 46, 16],

            // 17
            [1, 135, 107, 5, 136, 108],
            [10, 74, 46, 1, 75, 47],
            [1, 50, 22, 15, 51, 23],
            [2, 42, 14, 17, 43, 15],

            // 18
            [5, 150, 120, 1, 151, 121],
            [9, 69, 43, 4, 70, 44],
            [17, 50, 22, 1, 51, 23],
            [2, 42, 14, 19, 43, 15],

            // 19
            [3, 141, 113, 4, 142, 114],
            [3, 70, 44, 11, 71, 45],
            [17, 47, 21, 4, 48, 22],
            [9, 39, 13, 16, 40, 14],

            // 20
            [3, 135, 107, 5, 136, 108],
            [3, 67, 41, 13, 68, 42],
            [15, 54, 24, 5, 55, 25],
            [15, 43, 15, 10, 44, 16],

            // 21
            [4, 144, 116, 4, 145, 117],
            [17, 68, 42],
            [17, 50, 22, 6, 51, 23],
            [19, 46, 16, 6, 47, 17],

            // 22
            [2, 139, 111, 7, 140, 112],
            [17, 74, 46],
            [7, 54, 24, 16, 55, 25],
            [34, 37, 13],

            // 23
            [4, 151, 121, 5, 152, 122],
            [4, 75, 47, 14, 76, 48],
            [11, 54, 24, 14, 55, 25],
            [16, 45, 15, 14, 46, 16],

            // 24
            [6, 147, 117, 4, 148, 118],
            [6, 73, 45, 14, 74, 46],
            [11, 54, 24, 16, 55, 25],
            [30, 46, 16, 2, 47, 17],

            // 25
            [8, 132, 106, 4, 133, 107],
            [8, 75, 47, 13, 76, 48],
            [7, 54, 24, 22, 55, 25],
            [22, 45, 15, 13, 46, 16],

            // 26
            [10, 142, 114, 2, 143, 115],
            [19, 74, 46, 4, 75, 47],
            [28, 50, 22, 6, 51, 23],
            [33, 46, 16, 4, 47, 17],

            // 27
            [8, 152, 122, 4, 153, 123],
            [22, 73, 45, 3, 74, 46],
            [8, 53, 23, 26, 54, 24],
            [12, 45, 15, 28, 46, 16],

            // 28
            [3, 147, 117, 10, 148, 118],
            [3, 73, 45, 23, 74, 46],
            [4, 54, 24, 31, 55, 25],
            [11, 45, 15, 31, 46, 16],

            // 29
            [7, 146, 116, 7, 147, 117],
            [21, 73, 45, 7, 74, 46],
            [1, 53, 23, 37, 54, 24],
            [19, 45, 15, 26, 46, 16],

            // 30
            [5, 145, 115, 10, 146, 116],
            [19, 75, 47, 10, 76, 48],
            [15, 54, 24, 25, 55, 25],
            [23, 45, 15, 25, 46, 16],

            // 31
            [13, 145, 115, 3, 146, 116],
            [2, 74, 46, 29, 75, 47],
            [42, 54, 24, 1, 55, 25],
            [23, 45, 15, 28, 46, 16],

            // 32
            [17, 145, 115],
            [10, 74, 46, 23, 75, 47],
            [10, 54, 24, 35, 55, 25],
            [19, 45, 15, 35, 46, 16],

            // 33
            [17, 145, 115, 1, 146, 116],
            [14, 74, 46, 21, 75, 47],
            [29, 54, 24, 19, 55, 25],
            [11, 45, 15, 46, 46, 16],

            // 34
            [13, 145, 115, 6, 146, 116],
            [14, 74, 46, 23, 75, 47],
            [44, 54, 24, 7, 55, 25],
            [59, 46, 16, 1, 47, 17],

            // 35
            [12, 151, 121, 7, 152, 122],
            [12, 75, 47, 26, 76, 48],
            [39, 54, 24, 14, 55, 25],
            [22, 45, 15, 41, 46, 16],

            // 36
            [6, 151, 121, 14, 152, 122],
            [6, 75, 47, 34, 76, 48],
            [46, 54, 24, 10, 55, 25],
            [2, 45, 15, 64, 46, 16],

            // 37
            [17, 152, 122, 4, 153, 123],
            [29, 74, 46, 14, 75, 47],
            [49, 54, 24, 10, 55, 25],
            [24, 45, 15, 46, 46, 16],

            // 38
            [4, 152, 122, 18, 153, 123],
            [13, 74, 46, 32, 75, 47],
            [48, 54, 24, 14, 55, 25],
            [42, 45, 15, 32, 46, 16],

            // 39
            [20, 147, 117, 4, 148, 118],
            [40, 75, 47, 7, 76, 48],
            [43, 54, 24, 22, 55, 25],
            [10, 45, 15, 67, 46, 16],

            // 40
            [19, 148, 118, 6, 149, 119],
            [18, 75, 47, 31, 76, 48],
            [34, 54, 24, 34, 55, 25],
            [20, 45, 15, 61, 46, 16]
        ];

        var qrRSBlock = function (totalCount, dataCount) {
            var _this = {};
            _this.totalCount = totalCount;
            _this.dataCount = dataCount;
            return _this;
        };

        var _this = {};

        var getRsBlockTable = function (typeNumber, errorCorrectLevel) {

            switch (errorCorrectLevel) {
                case QRErrorCorrectLevel.L:
                    return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
                case QRErrorCorrectLevel.M:
                    return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
                case QRErrorCorrectLevel.Q:
                    return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
                case QRErrorCorrectLevel.H:
                    return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
                default:
                    return undefined;
            }
        };

        _this.getRSBlocks = function (typeNumber, errorCorrectLevel) {

            var rsBlock = getRsBlockTable(typeNumber, errorCorrectLevel);

            if (typeof rsBlock == 'undefined') {
                throw new Error('bad rs block @ typeNumber:' + typeNumber +
                    '/errorCorrectLevel:' + errorCorrectLevel);
            }

            var length = rsBlock.length / 3;

            var list = new Array();

            for (var i = 0; i < length; i += 1) {

                var count = rsBlock[i * 3 + 0];
                var totalCount = rsBlock[i * 3 + 1];
                var dataCount = rsBlock[i * 3 + 2];

                for (var j = 0; j < count; j += 1) {
                    list.push(qrRSBlock(totalCount, dataCount));
                }
            }

            return list;
        };

        return _this;
    }();
    var qrBitBuffer = function () {

        var _buffer = new Array();
        var _length = 0;

        var _this = {};

        _this.getBuffer = function () {
            return _buffer;
        };

        _this.getAt = function (index) {
            var bufIndex = Math.floor(index / 8);
            return ((_buffer[bufIndex] >>> (7 - index % 8)) & 1) == 1;
        };

        _this.put = function (num, length) {
            for (var i = 0; i < length; i += 1) {
                _this.putBit(((num >>> (length - i - 1)) & 1) == 1);
            }
        };

        _this.getLengthInBits = function () {
            return _length;
        };

        _this.putBit = function (bit) {

            var bufIndex = Math.floor(_length / 8);
            if (_buffer.length <= bufIndex) {
                _buffer.push(0);
            }

            if (bit) {
                _buffer[bufIndex] |= (0x80 >>> (_length % 8));
            }

            _length += 1;
        };

        return _this;
    };
    var qr8BitByte = function (data) {

        var _mode = QRMode.MODE_8BIT_BYTE;
        var _data = data;
        var _bytes = qrcode.stringToBytes(data);

        var _this = {};

        _this.getMode = function () {
            return _mode;
        };

        _this.getLength = function (buffer) {
            return _bytes.length;
        };

        _this.write = function (buffer) {
            for (var i = 0; i < _bytes.length; i += 1) {
                buffer.put(_bytes[i], 8);
            }
        };

        return _this;
    };
    var base64DecodeInputStream = function (str) {

        var _str = str;
        var _pos = 0;
        var _buffer = 0;
        var _buflen = 0;

        var _this = {};

        _this.read = function () {

            while (_buflen < 8) {

                if (_pos >= _str.length) {
                    if (_buflen == 0) {
                        return -1;
                    }
                    throw new Error('unexpected end of file./' + _buflen);
                }

                var c = _str.charAt(_pos);
                _pos += 1;

                if (c == '=') {
                    _buflen = 0;
                    return -1;
                } else if (c.match(/^\s$/)) {
                    // ignore if whitespace.
                    continue;
                }

                _buffer = (_buffer << 6) | decode(c.charCodeAt(0));
                _buflen += 6;
            }

            var n = (_buffer >>> (_buflen - 8)) & 0xff;
            _buflen -= 8;
            return n;
        };

        var decode = function (c) {
            if (0x41 <= c && c <= 0x5a) {
                return c - 0x41;
            } else if (0x61 <= c && c <= 0x7a) {
                return c - 0x61 + 26;
            } else if (0x30 <= c && c <= 0x39) {
                return c - 0x30 + 52;
            } else if (c == 0x2b) {
                return 62;
            } else if (c == 0x2f) {
                return 63;
            } else {
                throw new Error('c:' + c);
            }
        };

        return _this;
    };
    return qrcode;
}();

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    }
}(function () {
    return qrcode;
}));
(function () {
    if (!document.getElementById('ops_share')) {
        var div1 = document.createElement('div')
        div1.id = 'ops_share'
        div1.setAttribute('class', 'triangle-right')
        document.body.appendChild(div1)
    }
    var CSS = ''
    var styleTag = document.createElement("style");
    styleTag.type = "text/css";
    document.getElementsByTagName('head')[0].appendChild(styleTag);
    if (styleTag.styleSheet) {
        styleTag.styleSheet.cssText = CSS;
    } else {
        styleTag.textContent = CSS;
    };
    var weixinDiv = false;
    var opsShareDiv = document.getElementById("ops_share");
    // target="_blank"
    var createShare = function () {
        var shareLayerDiv = document.createElement('div');
        opsShareDiv.appendChild(shareLayerDiv);
        shareLayerDiv.className = 'ops_shareLayer';
        var html = '';
        for (var i = 0; i < _opsShare.btns.length; i++) {
            if (i === 0 || i === 2) {
                html += '<li id="common_share_btn_' + i + '"><a target="_blank"  href="javascript:void(0)" onclick="_opsShare.share(\'' + _opsShare.btns[i].className + '\');" class="' + _opsShare.btns[i].className + '" title=' + _opsShare.btns[i].title + '><i> </i></a></li>';
            } else {
                html += '<li id="common_share_btn_' + i + '"><a  href="javascript:void(0)" onclick="_opsShare.share(\'' + _opsShare.btns[i].className + '\');return false;" class="' + _opsShare.btns[i].className + '" title=' + _opsShare.btns[i].title + '><i> </i></a></li>';
            }
        };
        shareLayerDiv.innerHTML = '<span class="ops_tit"></span><ul class="ops_icons">' + html + '</ul></div>';
    };
    var showWeixin = function () {
        createWeixin();
        weixinDiv.style.display = 'block';
        weixinDiv.style.left = document.body.clientWidth > weixinDiv.offsetWidth ? (document.body.scrollLeft + ((document.body.clientWidth - weixinDiv.offsetWidth) / 2)) + 'px' : 0 + 'px';
        //weixinDiv.style.top = document.body.clientHeight>weixinDiv.offsetHeight?(document.body.scrollTop + ((document.body.clientHeight - weixinDiv.offsetHeight) / 2))+'px':0+'px';
    };
    var createWeixin = function () {
        if (weixinDiv) {
            weixin_popup_main = document.getElementById('weixin_popup_main')
            weixin_popup_main.innerHTML = create_qrcode(window._opsShare.url || window.location.href, 21, 'L');
            return;
        };
        weixinDiv = document.createElement('div');
        document.body.insertBefore(weixinDiv, document.body.firstChild);
        weixinDiv.id = 'weixin_qrcode';
        weixinDiv.className = 'weixin_popup';
        weixinDiv.style.display = 'none';
        var weixin_popup_head = '<div class="weixin_popup_head"><span>分享到微信朋友圈</span><a class="weixin_popup_close" id="weixin_close" onclick="hideWeixin();return false;" href="#">×</a> </div>';
        var weixin_popup_foot = '<div class="weixin_popup_foot">打开微信，点击底部的“发现”，<br>使用“扫一扫”即可将网页分享至朋友圈。 </div>';
        var weixin_popup_main = document.createElement('div');
        weixin_popup_main.className = 'weixin_popup_main';
        weixin_popup_main.id = 'weixin_popup_main'
        weixin_popup_main.innerHTML = create_qrcode(window._opsShare.url || window.location.href, 21, 'L');
        weixinDiv.innerHTML = weixin_popup_head + weixin_popup_foot;
        weixinDiv.insertBefore(weixin_popup_main, weixinDiv.lastChild);
    };
    var create_qrcode = function (text, typeNumber, errorCorrectLevel, table) {
        var qr = qrcode(typeNumber || 21, errorCorrectLevel || 'L');
        qr.addData(text);
        qr.make();
        return qr.createTableTag();
    };
    var commonShareCopyUrl = function () {
        var txt = window._opsShare.url || window.location.href;
        if (window.clipboardData) {
            window.clipboardData.clearData();
            clipboardData.setData("Text", txt);
            alert("复制成功！");
        } else if (navigator.userAgent.indexOf("Opera") != -1) {
            window.location = txt;
            alert("复制成功！");
        } else if (window.netscape) {
            try {
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
            } catch (e) {
                window.prompt("复制链接: Ctrl+C, 并点击确认或按下Enter键", txt);
                //alert("被浏览器拒绝！\n请在浏览器地址栏输入'about:config'并回车\n然后将 'signed.applets.codebase_principal_support'设置为'true'");
            }
            var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
            if (!clip)
                return;
            var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
            if (!trans)
                return;
            trans.addDataFlavor("text/unicode");
            var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
            var copytext = txt;
            str.data = copytext;
            trans.setTransferData("text/unicode", str, copytext.length * 2);
            var clipid = Components.interfaces.nsIClipboard;
            if (!clip)
                return false;
            clip.setData(trans, null, clipid.kGlobalClipboard);
            alert("复制成功！");
        } else {
            window.prompt("复制链接: Ctrl+C, 并点击确认或按下Enter键", txt);
        }
    };
    window._opsShare = {
        text: document.title,
        url: window.location.href,
        pic: '',
        btns: [
            {
                title: '新浪微博',
                className: 'icon_sina',
                url: 'http://service.weibo.com/share/share.php?url=[$url]&title=[$text]&ralateUid=2286908003&source=人民网&sourceUrl=http%3A%2F%2Fwww.people.com.cn%2F&content=gb2312&pic=[$pic]',
                width: 650,
                height: 500
            },
            {
                title: '微信',
                className: 'icon_weixin',
                url: '',
                width: 612,
                height: 350
            },
            {
                title: 'QQ空间',
                className: 'icon_qzone',
                url: 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=[$url]&title=[$text]&pics=[$pic]&summary=',
                width: 612,
                height: 500
            },
            {
                title: '复制地址',
                className: 'icon_copy',
                url: '',
                width: 612,
                height: 500
            }],
        onload: function () {
            createShare();
        },
        share: function (className) {
            for (var i = 0; i < document.images.length; i++) {
                if (document.images[i].width >= 400 && document.images[i].height >= 300 || document.images[i].height >= 400 && document.images[i].width >= 300) {
                    this.pic = document.images[i].src;
                    break;
                };
            };
            for (var i = 0; i < this.btns.length; i++) {
                if (this.btns[i].className == className) {
                    switch (className) {
                        case 'icon_weixin':
                            showWeixin();
                            break;
                        case 'icon_copy':
                            commonShareCopyUrl();
                            break;
                        default:
                            // url = this.btns[i].url;
                            // url = url.replace(/\[\$text\]/g, encodeURIComponent(this.text));
                            // url = url.replace(/\[\$pic\]/g, encodeURIComponent(this.pic));
                            // url = url.replace(/\[\$url\]/g, encodeURIComponent(this.url));
                            // window.open(url, 'opsShare', 'toolbar=0,status=0,resizable=1,width=' + this.btns[i].width + ',height=' + this.btns[i].height + ',left=' + Math.round(screen.width / 2 - this.btns[i].width / 2) + ',top=' + Math.round(screen.height / 2 - this.btns[i].height / 2));
                            break;
                    };
                };
            };
        }
    };
    if (typeof window._opsShare.onload == 'function') {
        window._opsShare.onload();
    };
})();

function hideWeixin() {
    document.getElementById('weixin_qrcode').style.display = 'none';
}

if (typeof $ === 'undefined') {
    //console.log('!!!!!! 警告：在使用分享功能前，请首先引入jQuery！')
}

// 有分享功能的板块最外层，必须加上 section-common-share-wrap
// section-common-share-wrap 板块可增加 share-from-tagname share-from-h1 share-from-p share-from-strong  share-from-b 分享地址和文本都从这个标签中拿
// shareinfo-element 专门用于内层分享的元素，获取其文本作为分享文字、获取其链接作为分享地址；优先级别最高
// 如果没有指定 share-from-xxx和 shareinfo-element则自动按照 hx标签降级寻找

/* 获取分享链接和title，修改分享按钮的链接 放到一个单独的文件中 */
function commonShareUpdateShareInfo($shareBtn) {
    var $sectionShare = $shareBtn.closest('.section-common-share-wrap')
    var $btnShareWeibo = $('#common_share_btn_0 a')
    var $btnShareQZone = $('#common_share_btn_2 a')

    var $aTags = $sectionShare.find('a').filter(function (index, item) {
        // 是真实链接，记录
        if (/.+/.test($(this).attr('href'))) {
            return true
        }
        return false
    })
    // console.log('获取到的所有a标签', $aTags)

    var shareText = document.title //默认分享title为本网页title

    var shareURL = '' // 默认分享地址为本网页地址

    // 所有可能指定分享元素类型的可能
    var allShareClasses = [
        'share-from-h1',
        'share-from-h2',
        'share-from-h3',
        'share-from-h4',
        'share-from-h5',
        'share-from-h6',
        'share-from-strong',
        'share-from-b',
        'share-from-p',
        'share-from-span',
        'share-from-li',
    ]

    for (var v = 0; v < allShareClasses.length; v++) {
        if (new RegExp(allShareClasses[v], 'gi').test($sectionShare.attr('class'))) {
            var tagName = allShareClasses[v].split('share-from-')[1]
            var $shareInfoTag = $sectionShare.find(tagName).first()
            var $shareALink = $shareInfoTag.find('a')
            if ($shareALink.attr('href')) {
                shareURL = $shareALink.attr('href')
            }
            if ($shareALink.text()) {
                shareText = $shareALink.text()
            }
            // 如果有多个 share-from-xxx ，则只要第一个的
            break;
        }
    }

    //console.log('shareURL', shareURL, 'shareText', shareText)

    // 首先寻找专门用于分享的元素，有多个只取出1个
    var $shareElement = $sectionShare.find('.shareinfo-element').first()

    // 如果当前 shareinfo-element 应用于a标签，则直接取其链接
    if ($shareElement.length) {
        if ($shareElement[0].nodeName.toLocaleLowerCase() === 'a' && $shareElement.attr('href')) {
            shareURL = $shareElement.attr('href')
            if ($shareElement.text()) {
                shareText = $shareElement.text()
            }
        } else {
            // 取元素之内的链接
            var $shareALink = $shareElement.find('a')
            shareURL = $shareALink.attr('href')
            if ($shareElement.text()) {
                shareText = $shareElement.text()
            }
        }
    }

    // 仅仅在没有合法url时自动取 hx的标题和链接
    if (!shareURL || shareURL.length < 3) {
        // 寻找 h1-h6, h1优先级最高，有h1且有文字内容的h1标签，就不选取H2；否则向下继续找
        for (var i = 1; i <= 6; i++) {
            //遍历所有的hx，然后取出有文字值的作为标题
            var $hs = $sectionShare.find('h' + i)
            var getHText = false
            for (var j = 0; j < $hs.length; j++) {
                var hText = $hs.eq(j).text()
                var href = $hs.eq(j).find('a').attr('href')

                if (hText.replace(/\s/gi, '').length > 0) {
                    getHText = true
                    shareText = hText
                    if (/.+/.test(href)) {
                        shareURL = href
                    }
                    break
                }
            }
            if (getHText) {
                break
            }
        }
    }


    // 如果没有H，则从p标签中找，截取字段

    // hx标签中没有，则从a标签中寻找
    if (!shareURL) {
        if ($aTags.length) {
            shareURL = $aTags.first().attr('href')
        }
    }

    // 该板块没有a链接，则直接使用 网页地址
    if (!shareURL) {
        shareURL = window.location.href
    }

    var ops = window._opsShare

    if (ops) {
        ops.url = shareURL
        ops.text = shareText
        // 更新 微博a链接1
        var openWeiboShareURL = ops.btns[0].url
        openWeiboShareURL = openWeiboShareURL.replace(/\[\$text\]/g, encodeURIComponent(ops.text));
        openWeiboShareURL = openWeiboShareURL.replace(/\[\$pic\]/g, encodeURIComponent(ops.pic));
        openWeiboShareURL = openWeiboShareURL.replace(/\[\$url\]/g, encodeURIComponent(ops.url));
        $btnShareWeibo.attr('href', openWeiboShareURL)

        // 更新 qq空间 a链接2
        var openQZoneShareURL = ops.btns[2].url
        openQZoneShareURL = openQZoneShareURL.replace(/\[\$text\]/g, encodeURIComponent(ops.text));
        openQZoneShareURL = openQZoneShareURL.replace(/\[\$pic\]/g, encodeURIComponent(ops.pic));
        openQZoneShareURL = openQZoneShareURL.replace(/\[\$url\]/g, encodeURIComponent(ops.url));
        $btnShareQZone.attr('href', openQZoneShareURL)

    }

    //console.log('更新分享代码', window._opsShare)

    return $sectionShare
}


$(function () {
    var $ops = $('#ops_share')
    window.isLowIE = true

    $('.btn_share_common,.share1 em').mouseenter(function (e) {
        commonShareUpdateShareInfo($(this))
        // 有兼容问题
        var $btnShare = $(e.target)
        var rect = e.target.getBoundingClientRect()
        var shareBtnsWidth = 250
        var shareBtnsHeight = 42
        var width = rect.width
        var height = rect.height
       var left = rect.left === undefined ? rect.x : rect.left
       var top = rect.top === undefined ? rect.y : rect.top
        // 计算上线左右距离，默认放在右边
        var targetLeft = left + width
        var pl = parseFloat($(e.target).css('paddingLeft'))

        // 如果是指定显示在底部，给分享按钮添加 show_btn_share_bottom
        if ($btnShare.hasClass('show_btn_share_bottom')) {
            $ops.attr('class', 'triangle-top')
            targetLeft = left - (shareBtnsWidth - width)  + 18
            $ops.css({
                left: targetLeft,
                top: top + height * 2,
                opacity: 0
            }).show()
            setTimeout(function () {
                $ops.css({
                    left: targetLeft,
                    top: top + height,
                    opacity: 1
                })
            }, 100)
        } else {
            // 右侧距离不够显示
            if (window.innerWidth - left - width < shareBtnsWidth) {
                targetLeft = left - shareBtnsWidth
                $ops.attr('class', 'triangle-right')
            } else {
                $ops.attr('class', 'triangle-left')
            }
            $ops.css({
                left: targetLeft,
                top: top + height / 2,
                opacity: 0
            }).show()
            setTimeout(function () {
                $ops.css({
                    left: targetLeft,
                    top: top + height / 2 - shareBtnsHeight / 2,
                    opacity: 1
                })
            }, 100)
        }


       

    }).mouseleave(function () {
        $ops.hide()
    })

    $ops.mouseleave(function () {
        $(this).hide()
    }).mouseenter(function () {
        $(this).show()
    })
})


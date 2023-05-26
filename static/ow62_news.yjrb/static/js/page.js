(function (exports) {

    //1.取出page_info
    //2.算分块路径
    //3.根据点击的页码取出对应块的位置
    //4.再点击时，先判断是否是已缓存固定块的数据，如果是不再取，依照公式取10条

    exports.Page = Page;

    function Page(container, option) {

        this.container = container;
        this.option = option;
        this.pageInfo = null;
        this.paginator = null;
        this.isEnd = false;
        this.lastPosition = null;
        this._init();

    }


    //初始化
    Page.prototype._init = function () {

        var self = this;
        self.container = self.container || $('body');
        self.option = $.extend({}, {
            pageNum: 0,
            indexName: 'index',
            //indexName: 'list_index', 正式环境为list_index
            pageTemplate: self.container.find('#pageTemplate').html(),
            extName: '.json',
            preload: true,
            nextCallback: null,
            pageTotalCount: 10,
            stepNum: 1,
        }, self.option);


        self.pageInfo = self._getJson('page_info.json');

        self.delList = self._getJson('del_list.json');

        // 一共有几页
        self.paginator = self.createPaginator();

        self._renderPage(self._getData());
        self._bindEvent();

        return self;
    };

    Page.prototype._getJson = function (pageName) {
        var self = this;
        var result = null;
        var dataUrl = self.option.dataUrl;
        var _tempDataUrl = '';
        if (pageName.indexOf('del_list') >= 0) {
            _tempDataUrl = dataUrl.split('/');
            dataUrl = _tempDataUrl.slice(0, 3).join('/') + '/' + pageName;

        } else {
            dataUrl = dataUrl.substring(0, dataUrl.lastIndexOf('/') + 1) + pageName;
        }

        $.ajaxSettings.async = false;

        $.getJSON(dataUrl, function (jsonResult) {
            result = jsonResult;

        }).error(function (xhr, status, error) {
            console.info('get page info error:', status, error);
        });
        $.ajaxSettings.async = true;

        return result;
    };

    Page.prototype._getTempData = function () {

        var self = this;
        var pageName;
        var data = [];
        var stepNum = self.option.stepNum;

        if (self.option.pageNum == self.paginator.pageCount) {
            self.isEnd = true;
            return data;
        }
        if (!stepNum || stepNum <= 1) {
            if (self.option.pageNum === 0) {
                pageName = self.option.indexName + self.option.extName;
                self.option.pageNum++;
            } else {
                self.option.pageNum++;
                pageName = self._genPageName(self.option.pageNum, true) + self.option.extName;
            }

            data = self._getJson(pageName);

            if (data && data.page_data && data.page_data instanceof Array) {

                return data.page_data.slice(0, self.option.pageTotalCount);
            }
        } else {
            var fileName, dataList;
            for (var i = 0; i < stepNum; i++) {
                if (self.option.pageNum == 0 && i==0) {
                    fileName = self.option.indexName;
                    if (self.option.pageNum < self.paginator.pageCount) {
                        self.option.pageNum++;
                    }
                } else {
                    if (self.option.pageNum < self.paginator.pageCount) {
                        self.option.pageNum++;
                        fileName = self._genPageName(self.option.pageNum,true);
                    }else{
                        break;
                    }

                }
                dataList = self._getJson(fileName + self.option.extName);
                if (dataList && dataList.page_data) {
                    data = data.concat(dataList.page_data);
                }
            }
            return data;
        }
        return [];
    };

    Page.prototype._getDataPosition = function (startPos) {
        var self = this;
        var delList = self.delList
        var itemNum = self.option.pageTotalCount;
        var list = [];
        var isExists = false;

        for (var i = startPos; i > 0; i--) {
            for (var j = 0; j < delList.length; j++) {
                if (i == delList[j]) {
                    isExists = true;
                }
            }
            if (!isExists) {
                list.push(i);
                itemNum--;
            }

            if (itemNum == 0) {
                break;
            }

            isExists = false;
        }
        return list;
    };


    Page.prototype._getBlockData = function (lastPageNum) {

        var self = this;

        if (self.option.pageNum == self.paginator.pageCount) {
            self.isEnd = true;
            return [];
        }

        var pageInfo = self.pageInfo || {};
        var delList = self.delList;

        var fileNum;
        var fileList = [];
        var pageList = [];
        var nowBlockDel = [];

        var posStart = 1;

        var count_per_page = pageInfo.count_per_page;
        var last_position = self.lastPosition;

        if (last_position === null) {
            last_position = pageInfo.last_position;
        }

        if (last_position <= 0) {
            return fileList;
        }

        var dataPos = self._getDataPosition(last_position - 1);

        var blockStartNum = Math.ceil(dataPos[0] / count_per_page); //块号起始
        var blockEndNum = Math.ceil(dataPos[dataPos.length - 1] / count_per_page); //块号结束

        var dataStartPos;//起始页第一个position


        for (var j = blockStartNum; j >= blockEndNum; j--) {
            var dataList = self._getJson(self._genPageName(j) + self.option.extName);
            if (dataList && dataList.page_data) {
                fileList = dataList.page_data.concat(fileList);
            }
        }

        fileList.reverse();

        dataStartPos = blockStartNum * count_per_page;

        for (var i = dataStartPos - dataPos[0]; i < fileList.length; i++) {
            for (var j = 0; j < dataPos.length; j++) {
                if ((dataStartPos - i) == dataPos[j]) {
                    pageList.push(fileList[i]);
                }
            }
            if (pageList.length == dataPos.length) {
                self.option.pageNum++;
                break;
            }
        }

        self.lastPosition = dataPos[dataPos.length - 1];
        return pageList;
    };

    Page.prototype.createPaginator = function () {
        var self = this;
        var pageInfo = self.pageInfo;
        if (!pageInfo) {
            return { pageCount: 0 };
        }
        var delList = self.delList || [];
        var count_per_page = pageInfo.count_per_page;
        var last_position = pageInfo.last_position;
        var temp_page_count = pageInfo.temp_page_count;//临时页总数
        var temp_count = pageInfo.temp_count;//临时数据总数

        var lastNum = temp_count % self.option.pageTotalCount;//最后一页是否满10条，满则0不满则余

        var blockStartNum; //固定页块起始
        var blockEndNum; //块号结束
        var blockDataStartPos = 0;
        var blockDelCount = 0;
        var blockTotalCount = 0;
        var fiexdNum = 0;

        if (lastNum == 0 && last_position > 1) {
            blockStartNum = Math.ceil((last_position - 1) / count_per_page);
        } else {
            blockStartNum = 0;
        }

        if (blockStartNum > 0) {

            blockDataStartPos = last_position - 1; //要取数据position起始

            for (var i = 0; i < delList.length; i++) {
                if (delList[i] <= blockDataStartPos) {
                    blockDelCount++;
                }
            }

            blockTotalCount = blockDataStartPos - blockDelCount;

            if (blockTotalCount > 0) {
                fiexdNum = Math.ceil(blockTotalCount / self.option.pageTotalCount);
            }
        }

        return { pageCount: temp_page_count + fiexdNum };
    };

    Page.prototype._genData = function (data) {
        var self = this;
        var _data = [];
        var time;
        var newTime;
        var num;
        if (data) {
            data.forEach(function (item) {
                try {
                    if (item) {
                        time = item.publishTime;
                        if (time) {
                            newTime = date_format(time);
                        }

                        item.publishTime = newTime;
                    }
                } catch (error) {
                    console.warn('gen data error:', error);
                    item.publishTime = newTime || '';
                }

                _data.push(item);
            });
        }
        return _data;
    };

    Page.prototype._getData = function () {
        var self = this;
        var pageInfo = self.pageInfo || {};
        var data = [];

        if (self.paginator.pageCount > 0) {
            if (self.option.pageNum < pageInfo.temp_page_count) {
                var lastTempLen;
                data = self._getTempData();
                lastTempLen = data.length;
                if (self.option.pageNum <= self.option.stepNum && self.paginator.pageCount <= self.option.stepNum) {
                    self.isEnd = true;
                } else {
                    if ((lastTempLen > 0 && lastTempLen < self.option.pageTotalCount) && (self.option.pageNum < self.paginator.pageCount)) {
                        data = data.concat(self._getBlockData(lastTempLen));
                        if (lastTempLen <= self.option.pageTotalCount && data.length > lastTempLen) {
                            self.option.pageNum--;
                        }
                    } else if (lastTempLen <= 0) {
                        self.isEnd = true;
                    } else {
                        self.isEnd = false;
                    }
                }

            } else {
                data = self._getBlockData();
            }
        } else {
            self.isEnd = true;
        }
        if (self.option.pageNum >= 0 && self.option.pageNum <= self.option.stepNum) {
            self.option.nextCallback && self.option.nextCallback.apply(self.option.$btnNext, [self.isEnd, self.option.pageNum]);
        }

        if (data.length == 0) {
            self.isEnd = true;
        }
        return data;
    };


    Page.prototype._bindEvent = function () {
        var self = this;
        self.option.$btnNext.on('click', function () {
            if (!self.isEnd) {
                self._renderPage(self._getData());
            }
            self.option.nextCallback && self.option.nextCallback.call(this, self.isEnd);
        });
    };


    Page.prototype._genPageName = function (pageNum, isTemp) {
        var pageName = isTemp ? '00000000' : '000000000';
        return (pageName + pageNum).substr(-pageName.length);
    };

    // 渲染数据并判断是否结束
    Page.prototype._renderPage = function (dataList) {
        if (dataList) {
            var self = this;
            var template = self.option.pageTemplate;
            var pageCount = self.paginator.pageCount;

            var renderTemplate = function (template, data) {
                data.open = "{&";
                data.close = "&}";
                return ejs.render(template, data);
            };

            if (dataList instanceof Array) {
                dataList = self._genData(dataList);
            }

            if (template) {
                if (dataList.length > 0) {
                    self.container.append(renderTemplate(template, { items: dataList }));

                }
                if (self.option.pageNum === pageCount) {
                    self.isEnd = true;
                }
            } else {
                console.info('render page error: missing template');
            }
        }
    };


}(window));
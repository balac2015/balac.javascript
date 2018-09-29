import fetch from 'node-fetch';
import Ids from '../models/ids';
import formidable from 'formidable';
import path from 'path';
import fs from 'fs';
import qiniu from 'qiniu';
import gm from 'gm';

qiniu.conf.ACCESS_KEY = 'Ep714TDrVhrhZzV2VJJxDYgGHBAX-KmU1xV1SQdS';
qiniu.conf.SECRET_KEY = 'XNIW2dNffPBdaAhvm9dadBlJ-H6yyCTIJLxNM_N6';

export default class BaseComponent {
    constructor () {
        this.idList = ['restaurant_id', 'food_id', 'order_id', 'user_id', 'address_id', 'cart_id', 'img_id', 'category_id', 'item_id', 'sku_id', 'admin_id', 'statis_id'];
        this.imgTypeList = ['shop', 'food', 'avatar', 'default'];
        this.uploadImg = this.uploadImg.bind(this);
        this.qiniu = this.qiniu.bind(this);
    }

    async fetch (url = '', data = {}, type = 'GET', resType = 'JSON') {}

    async getId (type) {}

    async uploadImg (req, res, next) {}

    async getPath (req) {}

    async qiniu (req, )
};
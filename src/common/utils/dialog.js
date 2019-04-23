import React, { Component } from 'react';
import { Modal } from 'antd';

/**
 * 普通文字对话框。
 * @author Tinybo
 * @date 2019 04 20
 * @export
 * @param {*} data
 */
export function dialog (data) {
    switch (data.type) {
        case 'info': Modal.info({
            visible: data.visible ? data.visible : true,
            title: data.title,
            content: data.content,
            okText: data.okText,
            onOk: data.callback
        }); break;
        case 'success': Modal.success({
            visible: data.visible ? data.visible : true,
            title: data.title,
            content: data.content,
            okText: data.okText,
            onOk: data.callback
        }); break;
        case 'warning': Modal.warning({
            visible: data.visible ? data.visible : true,
            title: data.title,
            content: data.content,
            okText: data.okText,
            onOk: data.callback
        }); break;
        case 'error': Modal.error({
            visible: data.visible ? data.visible : true,
            title: data.title,
            content: data.content,
            okText: data.okText,
            onOk: data.callback
        }); break;
    }
} 
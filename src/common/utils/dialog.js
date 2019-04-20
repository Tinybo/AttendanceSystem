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
            title: data.title,
            content: data.content,
            okText: data.okText,
            onOk: data.callback
        }); break;
        case 'success': Modal.success({
            title: data.title,
            content: data.content,
            okText: data.okText,
            onOk: data.callback
        }); break;
        case 'warning': Modal.warning({
            title: data.title,
            content: data.content,
            okText: data.okText,
            onOk: data.callback
        }); break;
        case 'error': Modal.error({
            title: data.title,
            content: data.content,
            okText: data.okText,
            onOk: data.callback
        }); break;
    }
} 
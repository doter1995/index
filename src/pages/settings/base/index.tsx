import {Form, Input, Button, Checkbox, message} from 'antd';
import styles from "./index.module.scss";
import {observer} from "mobx-react";
import {ConfigStore} from "../../../store/config";
import {useStores} from "../../../store";

export const BaseSettings = (observer(() => {
    const config = useStores('config') as ConfigStore
    const onFinish = (values: any) => {
        config.setBaseConfig(values);
        message.success("保存成功！")
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return <div className={styles.Base}>
        <Form
            name="basic"
            className={styles.BaseForm}
            labelCol={{span: 8}}
            wrapperCol={{span: 16}}
            initialValues={{remember: true, ...config.baseConfig}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="仓库地址"
                name="repos"
                rules={[{required: true, message: '请填写gitee仓库地址!'}]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="Token"
                name="token"
                rules={[{required: true, message: '请填写gitee Token!'}]}
            >
                <Input.Password/>
            </Form.Item>
            <Form.Item
                label="配置文件"
                name="configPath"
            >
                <Input placeholder="/config.json"/>
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" wrapperCol={{offset: 8, span: 16}}>
                <Checkbox>缓存在LocalStore</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{offset: 8, span: 16}}>
                <Button type="primary" htmlType="submit">
                    保存
                </Button>
            </Form.Item>
        </Form>

    </div>
}))
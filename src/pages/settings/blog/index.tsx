import {Form, Input, Button, Checkbox, message} from 'antd';
import styles from "./index.module.scss";
import {observer} from "mobx-react";
import {ConfigStore} from "../../../store/config";
import {useStores} from "../../../store";
import {BlogConfig} from "../../../service";
import {useCallback} from "react";

const formToConfig = (v: any): BlogConfig => {
    return {
        user: {
            name: v.name,
            email: v.email
        },
        basePath: v.basePath
    }
}
const configToForm = (config: BlogConfig) => {
    return {
        name: config.user?.name,
        email: config.user?.email,
        basePath: config.basePath
    }
}
export const BlogSettings = (observer(() => {
    const config = useStores<ConfigStore>('config')
    const [form] = Form.useForm();
    useCallback(() => {
        console.log("res", config.blogConfig)
        form.setFieldsValue(configToForm(config.blogConfig))
    }, [config.blogConfig])
    const onFinish = (values: any) => {
        config.setBlogConfig(formToConfig(values));
        message.success("保存成功！")
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const initValue = configToForm(config.blogConfig);
    return <div className={styles.BlogSettings}>
        {config.blogConfig.user?.name}
        <Form
            name="blog"
            form={form}
            className={styles.BlogSettingsForm}
            labelCol={{span: 8}}
            wrapperCol={{span: 16}}
            initialValues={initValue}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="用户名"
                name="name"
                rules={[{required: true, message: '请填写用户名'}]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="邮箱"
                name="email"
                rules={[{required: true, message: '请填写邮箱'}]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label="路径"
                name="basePath"
            >
                <Input placeholder="请配置路径"/>
            </Form.Item>

            <Form.Item wrapperCol={{offset: 8, span: 16}}>
                <Button type="primary" htmlType="submit">
                    保存
                </Button>
            </Form.Item>
        </Form>

    </div>
}))
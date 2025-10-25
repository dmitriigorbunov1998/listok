'use client';

import React, { useState } from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input, message } from 'antd';
import './AuthScreen.css';

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

interface AuthScreenProps {
    onSuccess?: (values: FieldType) => void;
    onError?: (error: any) => void;
    isLoading?: boolean;
}

export const AuthScreen = (
    {
        onError,
        isLoading = false,
    }: AuthScreenProps) => {

    const [form] = Form.useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [rememberMe, setRememberMe] = useState(true);

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        try {
            setIsSubmitting(true);
        } catch (error) {
            console.error('Login error', error);
            message.error('Login failed!');
            onError?.(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
        message.error('Please check the form for errors');
        onError?.(errorInfo);
    };

    const handleReset = () => {
        form.resetFields();
        setRememberMe(true);
    };

    return (
        <div className="auth">
            <div className='authLogo'>listok
                <div className="authText">Авторизация</div>
            </div>
            <Form
                form={form}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: rememberMe }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Пожалуйста введите имя' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Пожалуйста введите пароль' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
                    <Checkbox
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                    >
                        Remember me
                    </Checkbox>
                </Form.Item>

                <Form.Item label={null}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={isSubmitting || isLoading}
                        style={{ marginRight: 8 }}
                    >
                        Submit
                    </Button>
                    <Button onClick={handleReset}>
                        Reset
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
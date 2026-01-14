'use client';

import React, { useState } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import type { FormProps } from 'antd';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { createClient } from '@/app/lib/supabase/client';
import './AuthScreen.css';
import { AuthGmailButton } from '@/components/HorizontalMenu/AuthGmailButton/AuthGmailButton';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type FieldType = {
    email: string;
    password: string;
    remember?: boolean;
};

export const AuthScreen = () => {
    const [form] = Form.useForm();
    const router = useRouter();
    const supabase = createClient();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const mutation = useMutation({
        mutationFn: async (values: FieldType) => {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: values.email,
                password: values.password,
            });

            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            toast.success('✅ Вход на портал осуществлён');
            router.push('/');
        },
        onError: () => {
            toast.error('Ошибка при входе. Проверьте введённые данные и попробуйте снова.');
        },
    });

    const handleOnclickRegistration = () => {
        router.push('/register');
    };

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        setIsSubmitting(true);
        try {
            await mutation.mutateAsync(values);
        } catch (err) {
            console.error('Login error:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        toast.error('❌ Форма заполнена неверно. Проверьте правильность введённых данных.');
        console.warn('Failed:', errorInfo);
    };

    const handleReset = () => {
        form.resetFields();
    };

    return (
        <div className="authContainer">
            <div className="authLogo">
                listok
                <div className="authText">Авторизация</div>
            </div>

            <Form
                form={form}
                name="authForm"
                layout="vertical" // ✅ метки сверху
                style={{
                    maxWidth: 482,
                    margin: '0 auto',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: 'Введите email!' },
                        { type: 'email', message: 'Некорректный email!' },
                    ]}
                >
                    <Input placeholder="example@mail.com" />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Пароль"
                    name="password"
                    rules={[{ required: true, message: 'Введите пароль!' }]}
                >
                    <Input.Password placeholder="Введите пароль" />
                </Form.Item>

                <Form.Item<FieldType>
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{ offset: 4, span: 16 }}
                >
                    <Checkbox>Запомнить меня</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={isSubmitting || mutation.isPending}
                        style={{ marginRight: 16 }}
                    >
                        Войти
                    </Button>

                    <Button
                        htmlType="button"
                        onClick={handleOnclickRegistration}
                        style={{ marginRight: 16 }}
                    >
                        Регистрация
                    </Button>

                    <Button onClick={handleReset}>Сбросить</Button>
                    <AuthGmailButton />
                </Form.Item>
            </Form>
        </div>
    );
};

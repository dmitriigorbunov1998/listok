'use client';

import React, { useState } from 'react';
import { App, Button, Form, Input, Checkbox } from 'antd';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { createClient } from '@/app/lib/supabase/client';
import './RegisterScreen.css';

type FieldType = {
    email: string;
    password: string;
    confirm?: string;
    remember?: boolean;
};

export const RegisterScreen = () => {
    const [form] = Form.useForm();
    const router = useRouter();
    const supabase = createClient();
    const { message, notification } = App.useApp();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const mutation = useMutation({
        mutationFn: async (values: FieldType) => {
            const { data, error } = await supabase.auth.signUp({
                email: values.email,
                password: values.password,
            });
            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            void message.success('✅ Пользователь зарегистрирован');
            router.push('/auth');
        },
        onError: (error: any) => {
            console.error('Ошибка регистрации:', error.message);
            notification.error({
                message: 'Ошибка при регистрации',
                description: 'Проверьте корректность данных и попробуйте снова.',
                placement: 'topRight',
            });
        },
    });

    const onFinish = async (values: FieldType) => {
        setIsSubmitting(true);
        try {
            await mutation.mutateAsync(values);
        } finally {
            setIsSubmitting(false);
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        notification.warning({
            message: 'Ошибка заполнения формы',
            description: 'Проверьте введённые данные.',
        });
        console.warn('Failed:', errorInfo);
    };

    return (
        <div className="registerContainer">
            <div className="registerLogo">
                listok
                <div className="registerText">Регистрация</div>
            </div>

            <Form
                form={form}
                name="registerForm"
                layout="vertical" // ✅ метки сверху
                style={{
                    width: '100%',
                    maxWidth: 482, // ✅ уменьшили контейнер, ошибка больше не сдвигает поля
                    margin: '0 auto',
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
                    hasFeedback
                    rules={[
                        { required: true, message: 'Введите пароль!' },
                    ]}
                >
                    <Input.Password placeholder="Введите пароль" />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Подтверждение пароля"
                    name="confirm"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        { required: true, message: 'Подтвердите пароль!' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Пароли не совпадают!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password placeholder="Повторите пароль" />
                </Form.Item>

                <Form.Item<FieldType> name="remember" valuePropName="checked">
                    <Checkbox>Запомнить меня</Checkbox>
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={isSubmitting || mutation.isPending}
                        style={{ width: '100%' }} // ✅ кнопка теперь full-width
                    >
                        Зарегистрироваться
                    </Button>
                </Form.Item>

                <Button type="link" onClick={() => router.push('/auth')} style={{ width: '100%' }}>
                    Назад к входу
                </Button>
            </Form>
        </div>
    );
};

import styles from './TaskPage.module.css';
import { Breadcrumb, Flex, Tag} from 'antd';
import {
    CheckCircleOutlined,
    ClockCircleOutlined,
    FormOutlined,
    HomeOutlined,
    InfoCircleOutlined,
    SyncOutlined
}
from '@ant-design/icons';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Space } from 'antd';
import React from 'react';

const items: MenuProps['items'] = [
    {
        label: 'В статус "В работе"',
        key: '1',
    },
    {
        label: 'В статус "Отклонено"',
        key: '2',
    },
    {
        label: 'В статус "Открыто"',
        key: '3',
    },
    {
        type: 'divider',
    },
    {
        label: 'Удалить',
        key: '4',
        danger: true,
    },
];

const menuProps = {
    items,
};

export const TaskPage = () => {
    return (
        <div className={styles.wrapper}>
            <Breadcrumb
                items={[
                    {
                        href: '',
                        title: (
                            <>
                                <HomeOutlined />
                                <span>Listok</span>
                            </>
                        )
                    },
                    {
                        title: (
                            <>
                                <div className={styles.breadcrumbTaskText}>LIST-15</div>
                            </>
                        )
                    },
                ]}
            />
            <div className={styles.taskDescriptionInfo}>
                <div className={styles.taskTitleText}>[Bug] Сделать плашки с проектами карточек универсальной ширины</div>
                <div className={styles.taskDropDown}>
                    <div className={styles.taskDropDownMenu}>
                        <Dropdown menu={menuProps} className={styles.taskDropDownMenu}>
                            <Button>
                                <Space>
                                    Действия
                                    <DownOutlined />
                                </Space>
                            </Button>
                        </Dropdown>
                    </div>
                    <div className={styles.taskEdit}><FormOutlined /></div>
                </div>
            </div>
            <div className={styles.taskStatus}>
                <SyncOutlined />
                <div className={styles.taskStatusText}>Статус:</div>
                <div className={styles.taskStatusTextDynamic}>
                    <Flex gap="4px 0" wrap>
                        <Tag icon={<CheckCircleOutlined />} color="success">
                            Выполнено
                        </Tag>
                    </Flex>
                </div>
            </div>
            <div className={styles.taskAssignee}>
                <UserOutlined />
                <div className={styles.taskAssigneeText}>Исполнитель:</div>
                <div className={styles.taskAssigneeTextDynamic}>Вадим Ефименко</div>
            </div>
            <div className={styles.taskCreator}>
                <UserOutlined />
                <div className={styles.taskCreatorText}>Автор:</div>
                <div className={styles.taskCreatorTextDynamic}>Дмитрий Горбунов</div>
            </div>
            <div className={styles.taskCreated}>
                <ClockCircleOutlined />
                <div className={styles.taskCreatedText}>Создана:</div>
                <div className={styles.taskCreatedTextDynamic}>2 сентября, 2025, 19:34</div>
            </div>
            <div className={styles.taskDescriptionTitle}>
                <InfoCircleOutlined />
                <div className={styles.taskDescriptionTitleText}>Описание:</div>
            </div>
            <div className={styles.taskDescriptionText}>
                Text styles follow website's hierarchy, using the specified font family (SF Pro Text) and its
                styles. Base styles are applied to components such as buttons, paragraphs, inputs. Headlings
                serve as titles within components.
            </div>
        </div>
    )
};
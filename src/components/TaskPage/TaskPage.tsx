import styles from './TaskPage.module.css';
import { Breadcrumb } from 'antd';
import { HomeOutlined, InfoCircleOutlined, UserOutlined } from "@ant-design/icons";

export const TaskPage = () => {
    return (
        <div className={styles.wrapper}>
            <Breadcrumb
                items={[
                    {
                        href: '',
                        title: <HomeOutlined title={'Мои задачи'}/>,
                    },
                    {
                        title: 'LIST-15',
                    },
                ]}
            />
            <h2 className={styles.taskTitle}>[Bug] Сделать плашки с проектами карточек универсальной ширины</h2>
            <div className={styles.taskDescriptionTitle}>
                <InfoCircleOutlined />
                <div className={styles.taskDescriptionTitleText}></div>Описание:
            </div>
            <div className={styles.taskDescriptionText}>
                Text styles follow website's hierarchy, using the specified font family (SF Pro Text) and its
                styles. Base styles are applied to components such as buttons, paragraphs, inputs. Headlings
                serve as titles within components.
            </div>
        </div>
    )
};
import { ProjectStatus } from '@/constants/consts';
import { useMemo } from 'react';
import './ProjectCardStatus.css';

interface ProjectCardStatusProps {
    status: ProjectStatus;
}

export const ProjectCardStatus = ({ status }: ProjectCardStatusProps) => {
    const properties = useMemo(() => {
        switch (status) {
            case ProjectStatus.AccessReceived:
                return {
                    background: '#00CB14',
                    text: "Доступ получен",
                };
            case ProjectStatus.ApplicationSent:
                return {
                    background: '#FFC518',
                    text: "Заявка отправлена",
                };
        }
    }, [status]);

    return (
        <div className='projectCardStatus'>
            <div
                className='projectStatusIcon'
                style={{ background: properties.background }}
            />
            <div className='projectStatusText'>
                {properties.text}
            </div>
        </div>
    );
};
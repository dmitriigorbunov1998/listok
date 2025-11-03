import { TaskStatus } from '@/constants/constants';

export const taskStatusTransitions = {
    [TaskStatus.Open]: [TaskStatus.InProgress, TaskStatus.Rejected],
    [TaskStatus.InProgress]: [TaskStatus.Open, TaskStatus.Review],
    [TaskStatus.Review]: [TaskStatus.InProgress, TaskStatus.Testing],
    [TaskStatus.Testing]: [TaskStatus.InProgress, TaskStatus.Done],
    [TaskStatus.Done]: [TaskStatus.Closed],
    [TaskStatus.Closed]: [],
    [TaskStatus.Rejected]: [TaskStatus.Open],
}

export const taskStatusLabel = {
    [TaskStatus.Open]: "Создано",
    [TaskStatus.InProgress]: "В работе",
    [TaskStatus.Review]: "Ревью",
    [TaskStatus.Testing]: "Тестирование",
    [TaskStatus.Done]: "Готово",
    [TaskStatus.Rejected]: "Отклонено",
    [TaskStatus.Closed]: "Закрыта",
}
import { TaskCards } from '@/src/components/TaskCards';
import { Menu } from '@/src/components/Menu';
import styles from './globals.module.css';

export default function Home() {
  return (
    <main>
        <div className={styles.rowMenu}>
            <Menu />
            <TaskCards />
        </div>
    </main>
  );
}

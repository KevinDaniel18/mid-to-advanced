import { TaskProps } from "@/components/weeks/week1/days";

export const dummyProps = {
  data: null as unknown as TaskProps,
  setData: (_: TaskProps) => {},
  handleKeyPress: (_: React.KeyboardEvent<HTMLInputElement>) => {},
  addTaks: () => {},
  task: [] as TaskProps[],
  setTask: (_: React.SetStateAction<TaskProps[]>) => {},
  completed: 0,
  total: 0,
  progress: 0,
  deleteTask: (_: string) => {},
};

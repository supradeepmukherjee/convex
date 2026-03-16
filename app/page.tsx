import CreateTodo from "@/components/CreateTodo";
import TodoList from "@/components/TodoList";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 py-10 px-10">
      <CreateTodo />
      <TodoList />
    </div>
  );
}

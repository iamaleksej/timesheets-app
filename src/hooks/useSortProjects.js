import { useMemo } from "react";
import { useSelector } from "react-redux";

export const useSortProjects = () => {
   const { data: tasks } = useSelector((state) => state.tasks);
   const memoizedProjectArr = useMemo(() => {
      const arrProjects = []
      for (const item of tasks) {
         const project = item.project.name

         if (!arrProjects.includes(project)) {
            arrProjects.push(project)
         }
      }

      return arrProjects
   }, [tasks])

   return memoizedProjectArr
}

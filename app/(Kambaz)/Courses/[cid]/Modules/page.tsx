"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import {
    editModule,
    updateModule as updateModuleReducer,
    setModules,
    type Module,
} from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import * as client from "../../client";

type Lesson = {
    id?: string;
    _id?: string;
    name: string;
};

export default function Modules() {
    const { cid } = useParams();
    const courseId = cid as string;

    const [moduleName, setModuleName] = useState("");
    const { modules } = useSelector((state: RootState) => state.modulesReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchModules = async () => {
            if (!courseId) return;
            const modulesFromServer = await client.findModulesForCourse(
                courseId
            );
            dispatch(setModules(modulesFromServer));
        };

        fetchModules();
    }, [courseId, dispatch]);

    const onCreateModuleForCourse = async () => {
        if (!courseId || !moduleName.trim()) return;

        const newModule = { name: moduleName.trim(), course: courseId };

        try {
            const createdModule = await client.createModuleForCourse(
                courseId,
                newModule
            );
            dispatch(setModules([...modules, createdModule]));
            setModuleName("");
        } catch (e) {
            console.error(e);
        }
    };

    const onRemoveModule = async (moduleId: string) => {
        try {
            await client.deleteModule(cid as string, moduleId);
            dispatch(setModules(modules.filter((m: Module) => m._id !== moduleId)));
        } catch (e) {
            console.error(e);
        }
    };

    const onUpdateModule = async (module: Module) => {
        try {
            await client.updateModule(cid as string, module);
            const newModules = modules.map((m: Module) =>
                m._id === module._id ? module : m
            );
            dispatch(setModules(newModules));
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="wd-modules">
            <ModulesControls
                moduleName={moduleName}
                setModuleName={setModuleName}
                addModule={onCreateModuleForCourse}
            />
            <br />
            <br />
            <br />
            <br />
            <ListGroup id="wd-modules" className="rounded-0">
                {modules.map((m: Module) => (
                    <ListGroupItem
                        key={m._id}
                        className="wd-module p-0 mb-5 fs-5 border-gray"
                    >
                        <div className="wd-title p-3 ps-2 bg-secondary">
                            <BsGripVertical className="me-2 fs-3" />
                            {!m.editing && m.name}
                            {m.editing && (
                                <FormControl
                                    className="w-50 d-inline-block"
                                    onChange={(e) =>
                                        dispatch(
                                            updateModuleReducer({
                                                ...m,
                                                name: e.target.value,
                                            })
                                        )
                                    }
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            onUpdateModule({
                                                ...m,
                                                editing: false,
                                            });
                                        }
                                    }}
                                    defaultValue={m.name}
                                />
                            )}
                            <ModuleControlButtons
                                moduleId={m._id!}
                                deleteModule={onRemoveModule}
                                editModule={(moduleId) =>
                                    dispatch(editModule(moduleId))
                                }
                            />
                        </div>
                        {m.lessons && (
                            <ListGroup className="wd-lessons rounded-0">
                                {m.lessons.map((lesson: Lesson) => (
                                    <ListGroupItem
                                        key={lesson._id}
                                        className="wd-lesson p-3 ps-1"
                                    >
                                        <BsGripVertical className="me-2 fs-3" />
                                        {lesson.name}
                                        <LessonControlButtons />
                                    </ListGroupItem>
                                ))}
                            </ListGroup>
                        )}
                    </ListGroupItem>
                ))}
            </ListGroup>
        </div>
    );
}
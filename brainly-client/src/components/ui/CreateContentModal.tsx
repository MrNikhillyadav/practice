import { useRef, useState } from "react";
import { Button } from "./Button";
import { ImCancelCircle } from "react-icons/im";
import { Input } from "./Input";
import axios from "axios";
import { useContent } from "../../hooks/useContent";

interface ModalInterface {
    open: boolean;
    onClose: () => void;
}

enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter"
}

export function CreateContentModal({ open, onClose }: ModalInterface) {
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const {refresh} = useContent();
    const [type, setType] = useState('');

    async function CreateContent() {
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;

        try {
            await axios.post(
                "http://localhost:3000/api/v1/content/create",
                {
                        link,
                        title, 
                        type 
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            refresh();

            console.log("Content Created Successfully!");
            onClose();

        } catch (error) {

            alert(error.message);
            console.error(error);
        }
    }

    const isValid =
        type !== "" &&
        titleRef.current?.value !== "" &&
        linkRef.current?.value !== "";

    return (
        <>
            {open && (
                <div className="bg-[#0e0e0ed0] shadow-md bg-opacity-10 flex justify-center items-center  h-screen w-screen fixed top-0 left-0  ">
                    <div className="flex flex-col  w-[80vw] outline-none justify-center items-center rounded-md drop-shadow-sm bg-[#191919] md:w-[30vw] p-4 md:p-8">
                        <div className="flex mb-4  w-full justify-between items-center ">
                            <h2 className="font-bold  md:text-lg">Add Note</h2>
                            <div className="p-1 text-center flex items-center rounded-full hover:bg-[#3E3E3E] cursor-pointer">
                                <ImCancelCircle  onClick={onClose} />
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-center w-full gap-4">
                            <Input reference={titleRef} placeholder={'e.g. Musk came up with American Party'} />
                            <Input reference={linkRef} placeholder={'e.g. https://x.com/kevinlu625'} />
                            <p className="text-gray-400 text-sm inline-flex w-full text-start">
                                choose Content-type
                            </p>
                            <div className="flex  h-full gap-2 items-start w-full">
                                <Button
                                    title="Twitter"
                                    onClick={() => setType(ContentType.Twitter)}
                                    variant={type === ContentType.Twitter ? "secondary" : undefined}
                                />
                                <Button
                                    title="Youtube"
                                    onClick={() => setType(ContentType.Youtube)}
                                    variant={type === ContentType.Youtube ? "secondary" : undefined}
                                />
                            </div>
                            <Button
                                variant={isValid ? "primary" : undefined}
                                onClick={CreateContent}
                                title="Submit"
                                className="mt-10"
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

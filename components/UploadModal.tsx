"use client";

import { useSupabaseClient } from "@supabase/auth-helpers-react";
import uniqid from "uniqid";
import useUploadModal from "@/hooks/useUploadModal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";
import Input from "./Input";
import { useState } from "react";
import Button from "./Button";
import { toast } from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import Select from "./Select";
import { useAudiobooks } from "@/hooks/useAudiobooks";
import { Audiobook } from "@/types";

const UploadModal = () => {
    const [isLoading, setIsLoading] = useState(false);
    const uploadModal = useUploadModal();
    const { user } = useUser();
    const supabaseClient = useSupabaseClient();
    const router = useRouter();

    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

    const {audiobooks} = useAudiobooks();
     console.log(audiobooks);

     const formattedAudiobooks = audiobooks.map((audiobook: Audiobook) => ({
        value: audiobook.audiobook_id.toString(),
        label: audiobook.audiobook_title,
      }));



    const {
        register,
        handleSubmit,
        reset,
    } = useForm<FieldValues>({
        defaultValues: {
            denumire: "",
            book: null,
            image: null,
        },
    })

    const onChange = (open: boolean) => {
        if (!open) {
            reset();
            uploadModal.onClose();
        }
    }

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        try {
            setIsLoading(true);

            const imageFile = values.image?.[0];
            const bookFile = values.book?.[0];

            if (!imageFile || !bookFile || !user) {
                toast.error("Te rugăm să selectezi un fișier audio și o imagine.");
                return;
            }

            const uniqueId = uniqid();

            //Upload book
            const {
                data: bookData,
                error: bookError,
            } = await supabaseClient
            .storage
            .from('books')
            .upload(`book-${values.denumire}-${uniqueId}`, bookFile, {
                cacheControl: '3600',
                upsert: false,
            });
            if (bookError) {
                setIsLoading(false);
                return toast.error("A apărut o eroare la încărcarea audiobook-ului.");
            }

            //Upload image
            const {
                data: imageData,
                error: imageError,
            } = await supabaseClient
            .storage
            .from('images')
            .upload(`image-${values.denumire}-${uniqueId}`, imageFile, {
                cacheControl: '3600',
                upsert: false,
            });
            if (imageError) {
                setIsLoading(false);
                return toast.error("A apărut o eroare la încărcarea imaginii");
            }

            const {
                error: supabaseError,
            } = await supabaseClient
                .from('books')
                .insert({
                    user_id: user.id,
                    denumire: values.denumire,
                    image_path: imageData.path,
                    book_path: bookData.path
                });

            if (supabaseError) {
                setIsLoading(false);
                return toast.error(supabaseError.message);
            }

            router.refresh();
            setIsLoading(false);
            toast.success("Audiobook-ul a fost încărcat cu succes!");
            reset();
            uploadModal.onClose();
        } catch (error) {
            toast.error("A apărut o eroare la încărcarea audiobook-ului.");
        } finally {
            setIsLoading(false);
        }
    }

  return (
    <Modal
        title="Adaugă un Audiobook sau un Capitol nou"
        description=""
        isOpen={uploadModal.isOpen}
        onChange={onChange}
    >
        <div className=" overflow-y-auto max-h-[calc(100vh-12rem)]">
        <form
        onSubmit={handleSubmit(onSubmit)}
        className="
        flex
        flex-col
        gap-y-4
        "
        >
            <div className="flex items-center space-x-4">
            <Input
                        className="w-5 h-5"
                        id="checkbox"
                        type="checkbox"
                        checked={isCheckboxChecked}
                        onChange={() => setIsCheckboxChecked(!isCheckboxChecked)}
                    />
            <div className=" text-sm">
                Bifează dacă dorești să adaugi un capitol nou.
            </div>
            </div>
            <div>
                <div className="
                pb-1
                ">
                    Selectează audiobook-ul
                </div>
                <Select
                id="audiobook"
                options={formattedAudiobooks}
                disabled={!isCheckboxChecked}
            />
            </div>

            <div>
                <div className="
                pb-1
                ">
                    Denumirea noului audiobook
                </div>
            <Input
                id="denumire"
                disabled={isLoading || isCheckboxChecked}
                {...register("denumire", { required: true })}
                placeholder="Denumirea audiobook-ului"
            />
            </div>
            <div>
                <div className="
                pb-1
                ">
                    Selectează coperta audiobook-ului
                </div>
                <Input
                id="image"
                type="file"
                disabled={isLoading || isCheckboxChecked}
                accept="image/*"
                {...register("image", { required: true })}
            />
            </div>
            <div>
                <div className="
                pb-1
                ">
                    Titlul capitolului
                </div>
            <Input
                id="denumire"
                disabled={isLoading}
                {...register("denumire", { required: true })}
                placeholder="Denumirea capitolului"
            />
            </div>


            <div className="pb-1">
                <div className="
                pb-1
                ">
                    Selectează fișierul audio
                </div>
                <Input
                id="book"
                type="file"
                disabled={isLoading}
                accept=".mp3"
                {...register("book", { required: true })}
            />
            </div>

            <Button disabled={isLoading} type="submit">
                Încarcă
            </Button>

        </form>
</div>
    </Modal>
    );
}

export default UploadModal;
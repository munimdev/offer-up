"use client";
import React,{useState} from 'react';
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import * as Queries from "@/utils/queries";
const EmailVerification = ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const router = useRouter();
    const [sendRequest,setSendRequest] = useState<boolean>(false)
    const { mutateAsync, isError, error } = useMutation(
        async () => {
          const response = await Queries.verifyEmailCode(id);
          return response;
        }
      );
    
      const useVerification = async () => {
        setSendRequest(true);
    
        try {
          const data = await mutateAsync();
          if (data.statusCode === "111") {
            router.replace(`/`);
          }
        } catch (err) {
          console.error(err);
        }
      };
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <p className="mb-4 text-center">
                Press the following button to verify your email
            </p>
            <div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-[350px]" style={{ backgroundColor: sendRequest?'#DDDDDD':'#63C3FE' }} onClick={useVerification}>
                    Verify Email
                </button>
            </div>
        </div>
    );
};

export default EmailVerification;

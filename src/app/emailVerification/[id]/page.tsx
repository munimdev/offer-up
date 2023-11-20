"use client";
import React,{useState, useEffect} from 'react';
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import * as Queries from "@/utils/queries";
import { useToast } from "@/components/ui/use-toast";
import Loader from "@/components/misc/Loader";
const EmailVerification = ({ params }: { params: { p: string } }) => {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const p = searchParams.get("p")||''
    const router = useRouter();
    const [sendRequest,setSendRequest] = useState<boolean>(false)
    const { mutateAsync, isError, error,isLoading } = useMutation(
        async () => {
          const response = await Queries.verifyEmailCode(p);
          return response;
        }
      );
    useEffect(()=>{
      const useVerification = async () => {
        setSendRequest(true);
    
        try {
          const data = await mutateAsync();
          if (data.statusCode === "111") {
            toast({
              title: "Email Verification Successfully",
              description: "Your email verfication complete!",
            });
            setTimeout(() => {
              router.replace(`/`)
            }, 4000);
            router.replace(`/`);
          }
        } catch (err) {
          console.error(err);
          toast({
            title: "Error",
            description: "Something went wrong!",
          });
        }
      };
      useVerification();
    },[])
    
    return (
        <div className="flex flex-col items-center ">
           <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1BC3FF] mt-4">
           Verifying your email address!
    </h1>
    {/* <Loader/> */}
           {isLoading&&<Loader/>}
            <div>
  
            </div>
        </div>
    );
};

export default EmailVerification;

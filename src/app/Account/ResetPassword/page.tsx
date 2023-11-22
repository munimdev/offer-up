"use client";
import React,{useState} from 'react';
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import * as Queries from "@/utils/queries";
const ResetPassword = () => {
    const { toast } = useToast();
    const searchParams = useSearchParams();
    const[isResetButtonClicked,setIsResetButtonClicked] = useState(false)
    const p = searchParams.get("p")||''
    const [password,setPassword] = useState<string>('');
    const [cnPassword,setCnPassword]=useState<string>();
    const [error,setError] =useState<boolean>(false);
    const router = useRouter();
    const [sendRequest,setSendRequest] = useState<boolean>(false)
    const { mutateAsync: resetPassword } = useMutation({
        mutationKey: ["mutation-resetPassword"],
        mutationFn: (data: { key: string; password: string }) =>
          Queries.resetPassword(data),
      });
    
      const useResetPassoword = async () => {
        setSendRequest(true);
    console.log(p,'key')
        try {
            if(password===cnPassword){
              setIsResetButtonClicked(true)
              console.log(p,'p')
              console.log(password,'password')
                const data = await resetPassword({key:p,password:password});
                if (data.statusCode === "111") {
                    toast({
                        title: "Password Update Successfully",
                        description: "Your password has been update successfully!",
                      });
                      setTimeout(() => {
                        router.replace(`/`)
                      }, 4000);
                 
                }
            }else{
                setError(true)
                setSendRequest(false);
            }
          
        } catch (err) {
          console.error(err);
          toast({
            title: "Error",
            description: "Something went wrong!",
          });
        }
      };
    return (
        <>
        <p className="text-center font-semibold text-2xl mt-4 mb-4">
    Change Password
  </p>
       
<div className="flex flex-col items-center   mb-4">
{error && <p className="text-center text-red-500">Password don&apos;t match</p>}
  <div className="flex flex-col gap-y-4 w-[350px]  mb-4">
    <Label htmlFor="npass">New Password</Label>
    <Input onClick={()=>setError(false)} id="password" name="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
  </div>
  <div className="flex flex-col gap-y-4 w-[350px]  mb-4">
    <Label htmlFor="cpass">Confirm Password</Label>
    <Input onClick={()=>setError(false)} id="cnPassword" name="cnPassword" type="password" required onChange={(e) => setCnPassword(e.target.value)} />
  </div>
  <div>
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded w-[350px]" style={{ backgroundColor: sendRequest?'#DDDDDD':'#63C3FE', marginTop: '10px' }} onClick={useResetPassoword} disabled={isResetButtonClicked}>
      Reset Password
    </button>
  </div>
</div>
</>
    );
};

export default ResetPassword;

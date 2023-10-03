"use client";
import React,{useState} from 'react';
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import * as Queries from "@/utils/queries";
const ResetPassword = ({ params }: { params: { key: string } }) => {
    const { key } = params;
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
    
        try {
            if(password===cnPassword){
                const data = await resetPassword({key:key,password:password});
                if (data.statusCode === "111") {
                  router.replace(`/`);
                }
            }else{
                setError(true)
                setSendRequest(false);
            }
          
        } catch (err) {
          console.error(err);
        }
      };
    return (
<div className="flex flex-col items-center justify-center h-screen  mb-4">
{error && <p className="text-center text-red-500">Password don't match</p>}
  <div className="flex flex-col gap-y-4 w-[350px]  mb-4">
    <Label htmlFor="npass">New Password</Label>
    <Input onClick={()=>setError(false)} id="password" name="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
  </div>
  <div className="flex flex-col gap-y-4 w-[350px]  mb-4">
    <Label htmlFor="cpass">Confirm Password</Label>
    <Input onClick={()=>setError(false)} id="cnPassword" name="cnPassword" type="password" required onChange={(e) => setCnPassword(e.target.value)} />
  </div>
  <div>
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-6 px-4 rounded w-[350px]" style={{ backgroundColor: sendRequest?'#DDDDDD':'#63C3FE', marginTop: '10px' }} onClick={useResetPassoword}>
      Reset Password
    </button>
  </div>
</div>

    );
};

export default ResetPassword;

// @ts-nocheck
"use client";

import { useState, useRef } from "react";
import Image from "next/image";

import { useFetch } from "@/hooks";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "@/hooks/useSession";
import * as Queries from "@/utils/queries";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Slider } from "@/components/ui/slider";
import { Tabs } from "@/components/ui/tabs";
import AvatarEditor from "react-avatar-editor";

import { Camera, Mail, Phone,ShieldCheck,ShieldAlert } from "lucide-react";
import { TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";

const Setting = () => {
  // Ref
  const editorRef = useRef<AvatarEditor>(null);

  // Hooks
  const { user } = useSession();
  const { toast } = useToast();
  const [applyEmailVerify, setApplyEmailVerify] = useState<boolean>(false);

  // States
  const [error, setError] = useState<string>();
  const [image, setImage] = useState<File>();
  const [zoomLevel, setZoomLevel] = useState<number>(1.2);
  const [currentTab, setCurrentTab] = useState<"phone" | "otp">("phone");

  // Dialogs
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [isPhoneDialogOpen, setIsPhoneDialogOpen] = useState(false);

  const { mutateAsync: uploadPhoto } = useMutation({
    mutationKey: ["mutation-updateProfileImage"],
    mutationFn: (imagePath: string) =>
      Queries.updateProfileImage(user?.id!, imagePath!),
  });

  const { mutateAsync: changePassword } = useMutation({
    mutationKey: ["mutation-changePassword"],
    mutationFn: (data: { oldPassword: string; newPassword: string }) =>
      Queries.changePassword(data),
  });
  const { mutateAsync: resendEmail } = useMutation({
    mutationKey: ["mutation-resendEmailVerificationEmail"],
    mutationFn: () =>
      Queries.resendEmailVerificationEmail(),
  });

  const onImageHandler = async () => {
    try {
      const imagePath = editorRef.current!.getImage().toDataURL().split(",")[1];
      const response = await uploadPhoto(imagePath);
      if (response.statusCode === "111") {
        toast({
          title: "Profile Image Updated",
          description: "Your profile image has been updated successfully!",
        });
        setImage(undefined);
        setIsImageDialogOpen(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onPasswordChangeHandler = async (
    e: React.ChangeEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      const opass = e.target.opass.value; // Old Password
      const npass = e.target.npass.value; // New Password
      const cpass = e.target.cpass.value; // Confirm Password
      if (npass !== cpass) {
        setError("Password does not match");
        return;
      }
      const response = await changePassword({
        oldPassword: opass,
        newPassword: npass,
      });
      if (response.statusCode === "111") {
        toast({
          title: "Password Changed",
          description: "Your password has been changed successfully!",
        });
        setIsPasswordDialogOpen(false);
      } else {
        setError(response.message);
      }
    } catch (err) {
      console.log(err);
      setError("Something went wrong!");
    }
  };

  const onPhoneSubmitHandler = async (
    e: React.ChangeEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setCurrentTab("otp");
  };

  const { data, refetch } = useFetch({
    key: ["query-getMyProfile"],
    fn: () => Queries.getMyProfile({}),
    options: { enabled: !!user?.id! },
  });
  const emailVerificationHandler = async () => {
    
    try {
      setApplyEmailVerify(true);
    const response = await resendEmail()
    console.log(response)
      if (response.statusCode === "111") {
        toast({
          title: "Email Verification",
          description: "Please check you email for verification!",
        });
      } else {
        setError(response.message);
      }
    } catch (error) {
      
    }
  }
  return (
    <div className="w-8/12 py-4 mx-auto">
      <div className="flex flex-row items-center gap-x-5">
        <div className="flex flex-col items-center gap-y-2">
          <Image
            width={100}
            height={100}
            src="/images/placeholder.png"
            alt="account-image"
            className="rounded-full"
          />

          <Dialog
            onOpenChange={(e) => setIsImageDialogOpen(e)}
            open={isImageDialogOpen}
          >
            <DialogTrigger>
              <Camera strokeWidth={1.5} />
            </DialogTrigger>
            <DialogContent>
              {/* Dropzone */}
              {image ? (
                <div className="flex flex-col">
                  <AvatarEditor
                    ref={editorRef}
                    image={URL.createObjectURL(image)}
                    border={50}
                    scale={zoomLevel}
                    rotate={0}
                    height={300}
                    width={300}
                    className="mt-5 mx-auto z-10"
                  />
                  <span className="font-semibold mt-5">Zoom: </span>
                  <Slider
                    min={1}
                    max={2}
                    step={0.001}
                    defaultValue={[zoomLevel]}
                    onValueChange={(e) => setZoomLevel(e[0])}
                    className="mt-3 cursor-pointer"
                  />
                </div>
              ) : (
                <div className="relative w-full h-[300px] mt-4">
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-y-2 bg-gray-100 bg-opacity-50 rounded-lg">
                    <span className="text-2xl font-bold text-gray-500">
                      Drop Image Here
                    </span>
                    <span className="text-gray-500">or</span>
                    <span className="text-primary">Browse</span>
                    <input
                      type="file"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={(e) => {
                        setImage(e.target.files![0]);
                      }}
                    />
                  </div>
                </div>
              )}
              <Button onClick={onImageHandler}>Upload</Button>
            </DialogContent>
          </Dialog>
        </div>
        <div>
          <span className="text-lg font-bold">{data?.dataObject?.name.toUpperCase()}</span>
          <div className="flex flex-row mt-2 gap-x-5">
            <Mail strokeWidth={1.2} />
            <Phone strokeWidth={1.2} />
          </div>
        </div>
      </div>
      <div className="flex flex-col w-8/12 mt-10 gap-y-5">
        <span className="text-4xl font-bold">Account</span>
        {/* Name */}
        <div className="flex flex-row justify-between p-3 font-semibold border-b border-gray-300 cursor-pointer">

          <span>
          Name:  {data?.dataObject?.name.toUpperCase()}
          </span>
          <span className="text-primary">Edit</span>
        </div>
        {/* Email */}
        <div className="flex flex-row justify-between p-3 font-semibold border-b border-gray-300">
          <span>Email: {user?.email} </span> {data?.dataObject?.isEmailVerified?<span ><ShieldCheck strokeWidth={1.2}/></span>:<button
  className="bg-blue-300 hover:bg-blue-700 text-white text-primary py-1 px-1 rounded w-[140px] flex items-center justify-center"
  style={{ backgroundColor: applyEmailVerify ? '#DDDDDD' : '#63C3FE' }}
  onClick={emailVerificationHandler}
  disabled={applyEmailVerify} // Disable the button if applyEmailVerify is true
>
  <div className="mr-2">
    <ShieldAlert strokeWidth={1.2} />
  </div>
  Verify Now
</button>
}
        </div>
       
        {/* Location */}
        <div className="flex flex-row justify-between p-3 font-semibold border-b border-gray-300 cursor-pointer">
          <span>Location</span>
          <span className="cursor-pointer text-primary">Edit</span>
        </div>
        {/* Phone */}
        <Dialog>
          <DialogTrigger>
            <div className="flex flex-row justify-between p-3 font-semibold border-b border-gray-300 cursor-pointer">
              <span>Add Phone Number</span>
              <span className="cursor-pointer text-primary">Edit</span>
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <p className="text-center font-semibold text-2xl">Change Phone</p>
            </DialogHeader>
            <Tabs defaultValue={currentTab} value={currentTab}>
              <TabsContent value="phone">
                <form
                  className="flex flex-col gap-y-5"
                  onSubmit={onPhoneSubmitHandler}
                >
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    type="phone"
                    name="phone"
                    pattern="^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$"
                    placeholder="(555) 555-1234"
                    required
                  />
                  <Button type="submit">Send OTP</Button>
                </form>
              </TabsContent>
              <TabsContent value="otp">
                <form className="flex flex-col gap-y-5">
                  <Label htmlFor="otp">OTP</Label>
                  <Input
                    type="text"
                    name="otp"
                    placeholder="111-111-111"
                    required
                  />
                  <Button type="submit">Save</Button>
                </form>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
        {/* Password */}
        <Dialog
          onOpenChange={(e) => setIsPasswordDialogOpen(e)}
          open={isPasswordDialogOpen}
        >
          <DialogTrigger>
            <div className="flex flex-row justify-between p-3 font-semibold border-b border-gray-300 cursor-pointer">
              <span>Password</span>
              <span className="cursor-pointer text-primary">Edit</span>
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <p className="text-center font-semibold text-2xl">
                Change Password
              </p>
            </DialogHeader>
            <form
              className="flex flex-col gap-y-5"
              onSubmit={onPasswordChangeHandler}
            >
              <div className="flex flex-col gap-y-2">
                <Label htmlFor="opass">Current Password</Label>
                <Input id="opass" name="opass" type="password" required />
                <p className="text-sm">
                  Enter the password you use when you login with email.
                </p>
              </div>
              <div className="flex flex-col gap-y-2">
                <Label htmlFor="npass">New Password</Label>
                <Input id="npass" name="npass" type="password" required />
              </div>
              <div className="flex flex-col gap-y-2">
                <Label htmlFor="cpass">Confirm Password</Label>
                <Input id="cpass" name="cpass" type="password" required />
              </div>
              {error && <p className="text-center text-red-500">{error}</p>}
              <Button type="submit">Submit</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Setting;

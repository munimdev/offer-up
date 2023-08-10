import React from "react";

// Tanstack
import { useQuery } from "@tanstack/react-query";
import * as Querues from "@/utils/queries";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Form
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Icons
import { Flag } from "lucide-react";

type Props = {
  formSchema: z.ZodType<any, any>;
  lookupId: number;
  onSubmit: (data: any) => void;
};

const Report: React.FC<Props> = ({ formSchema, lookupId, onSubmit }) => {
  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onFormSubmit = form.handleSubmit((data) => {
    setIsDialogOpen(false);
    return onSubmit(data);
  });

  const { data: lookupList } = useQuery(
    ["lookupList"],
    () => Querues.getLookupList(lookupId),
    {
      enabled: !!lookupId,
    }
  );

  return (
    <Dialog open={isDialogOpen} onOpenChange={(e) => setIsDialogOpen(e)}>
      <DialogTrigger>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Flag size={20} strokeWidth={1.75} />
            </TooltipTrigger>
            <TooltipContent>Report User</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>Report User</DialogHeader>
        <DialogDescription>
          Please select the reason for reporting this user.
        </DialogDescription>
        <Form {...form}>
          <form onSubmit={onFormSubmit}>
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reason</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a reason" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {lookupList?.dataObject.map((item) => (
                            <SelectItem
                              key={item.id}
                              value={item.id.toString()}
                            >
                              {item.description}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Please enter a description"
                      rows={10}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="mt-2 w-full" type="submit">
              Report
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default Report;

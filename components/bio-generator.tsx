"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2, Copy } from "lucide-react";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { generateBio } from "@/lib/actions";

const formSchema = z.object({
  profession: z.string().min(1, "Please select a profession"),
  interest: z.string().min(1, "Please select an interest"),
  trait: z.string().min(1, "Please select a personality trait"),
});

interface BioGeneratorProps {
  professions: string[];
  interests: string[];
  traits: string[];
}

export function BioGenerator({
  professions,
  interests,
  traits,
}: BioGeneratorProps) {
  const [bio, setBio] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsGenerating(true);
      const generatedBio = await generateBio(values);
      setBio(generatedBio);
      toast.success("Bio generated successfully!");
    } catch (error) {
      toast.error("Failed to generate bio. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(bio);
    toast.success("Bio copied to clipboard!");
  };

  return (
    <div className="space-y-8 animate-in fade-in-50">
      <Card className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="profession"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What do you do?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your profession" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {professions.map((profession) => (
                        <SelectItem key={profession} value={profession.toLowerCase()}>
                          {profession}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="interest"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What's your main interest?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your interest" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {interests.map((interest) => (
                        <SelectItem key={interest} value={interest.toLowerCase()}>
                          {interest}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="trait"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What's your best personality trait?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your trait" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {traits.map((trait) => (
                        <SelectItem key={trait} value={trait.toLowerCase()}>
                          {trait}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isGenerating}>
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Bio"
              )}
            </Button>
          </form>
        </Form>
      </Card>

      {bio && (
        <Card className="p-6 space-y-4">
          <p className="text-lg leading-relaxed">{bio}</p>
          <div>
            <Button variant="outline" size="sm" onClick={copyToClipboard}>
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
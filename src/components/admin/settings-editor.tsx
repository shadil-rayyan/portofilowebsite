"use client";

import { useActionState, useState } from "react";
import { updateSettings, createTechStack, updateTechStack, deleteTechStack } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Save, User, Share2, Cpu, Plus, Trash2 } from "lucide-react";

interface SettingsEditorProps {
  hero: any;
  footer: any;
  contact: any;
  codeCompass: any;
  techStacks: any[];
}

export function SettingsEditor({ hero, footer, contact, codeCompass, techStacks }: SettingsEditorProps) {
  const [heroState, heroAction, isHeroPending] = useActionState(updateSettings, null);
  const [footerState, footerAction, isFooterPending] = useActionState(updateSettings, null);
  const [contactState, contactAction, isContactPending] = useActionState(updateSettings, null);
  const [codeState, codeAction, isCodePending] = useActionState(updateSettings, null);
  const [newTechState, newTechAction, isNewTechPending] = useActionState(createTechStack, null);

  return (
    <div className="space-y-8 pb-20">
      <div>
        <h1 className="text-3xl font-bold">Site Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your identity and technical stack.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Hero Settings */}
        <Card className="shadow-lg border-2">
          <CardHeader className="bg-muted/20 border-b">
            <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                <CardTitle>Hero Section</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <form action={heroAction} className="space-y-4">
              <input type="hidden" name="key" value="hero" />
              <Textarea 
                name="value" 
                className="font-mono text-xs h-64"
                defaultValue={JSON.stringify(hero, null, 2)}
                required
              />
              <Button type="submit" disabled={isHeroPending} className="w-full">
                {isHeroPending ? "Saving..." : <><Save className="mr-2 h-4 w-4" /> Save Hero</>}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Settings */}
        <Card className="shadow-lg border-2">
          <CardHeader className="bg-muted/20 border-b">
            <div className="flex items-center gap-2">
                <Share2 className="h-5 w-5 text-primary" />
                <CardTitle>Contact Info</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <form action={contactAction} className="space-y-4">
              <input type="hidden" name="key" value="contact" />
              <Textarea 
                name="value" 
                className="font-mono text-xs h-64"
                defaultValue={JSON.stringify(contact, null, 2)}
                required
              />
              <Button type="submit" disabled={isContactPending} className="w-full">
                {isContactPending ? "Saving..." : <><Save className="mr-2 h-4 w-4" /> Save Contact</>}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Footer Settings */}
        <Card className="shadow-lg border-2">
          <CardHeader className="bg-muted/20 border-b">
            <div className="flex items-center gap-2">
                <Share2 className="h-5 w-5 text-primary" />
                <CardTitle>Footer & Socials</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <form action={footerAction} className="space-y-4">
              <input type="hidden" name="key" value="footer" />
              <Textarea 
                name="value" 
                className="font-mono text-xs h-64"
                defaultValue={JSON.stringify(footer, null, 2)}
                required
              />
              <Button type="submit" disabled={isFooterPending} className="w-full">
                {isFooterPending ? "Saving..." : <><Save className="mr-2 h-4 w-4" /> Save Footer</>}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* CodeCompass Settings */}
        <Card className="shadow-lg border-2">
          <CardHeader className="bg-muted/20 border-b">
            <div className="flex items-center gap-2">
                <Cpu className="h-5 w-5 text-primary" />
                <CardTitle>CodeCompass</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <form action={codeAction} className="space-y-4">
              <input type="hidden" name="key" value="code_compass" />
              <Textarea 
                name="value" 
                className="font-mono text-xs h-64"
                defaultValue={JSON.stringify(codeCompass, null, 2)}
                required
              />
              <Button type="submit" disabled={isCodePending} className="w-full">
                {isCodePending ? "Saving..." : <><Save className="mr-2 h-4 w-4" /> Save CodeCompass</>}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Tech Stack Management */}
      <h2 className="text-2xl font-bold mt-12 flex items-center gap-2">
        <Cpu className="h-6 w-6 text-primary" /> Tech Stack Categories
      </h2>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {techStacks.map((stack) => (
            <Card key={stack.id} className="border-2">
                <CardHeader className="p-4 border-b bg-muted/10">
                    <form action={updateTechStack} className="space-y-4">
                        <input type="hidden" name="id" value={stack.id} />
                        <Input name="name" defaultValue={stack.name} className="font-bold border-none bg-transparent h-auto p-0 focus-visible:ring-0" />
                        <Textarea name="items" defaultValue={stack.items} className="font-mono text-[10px] h-32" />
                        <div className="flex justify-between items-center gap-2">
                            <Button type="submit" size="sm" variant="outline" className="flex-1 text-xs">Update</Button>
                            <Button type="button" size="sm" variant="ghost" className="text-destructive h-8 w-8 p-0" onClick={async () => {
                                if(confirm("Are you sure?")) {
                                    await deleteTechStack(stack.id);
                                    window.location.reload();
                                }
                            }}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </form>
                </CardHeader>
            </Card>
        ))}

        <Card className="border-2 border-dashed flex flex-col items-center justify-center p-6 space-y-4 min-h-[200px]">
             <Plus className="h-10 w-10 text-muted-foreground" />
             <p className="text-sm text-muted-foreground">Add New Category</p>
             <form action={newTechAction} className="w-full space-y-2">
                <Input name="name" placeholder="Frameworks" required />
                <input type="hidden" name="items" value="[]" />
                <Button type="submit" disabled={isNewTechPending} className="w-full" size="sm">
                    {isNewTechPending ? "Adding..." : "Add Category"}
                </Button>
             </form>
        </Card>
      </div>
    </div>
  );
}

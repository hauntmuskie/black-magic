import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const formSchema = z.object({
  namaPenyihir: z.string().min(2, {
    message: "Nama penyihir harus minimal 2 karakter.",
  }),
  namaTarget: z.string().min(2, {
    message: "Nama target harus minimal 2 karakter.",
  }),
  jenisSantet: z.string({
    required_error: "Silakan pilih jenis santet.",
  }),
  isPermanent: z.boolean().default(false),
});

const jenisSantetOptions = [
    { value: "santet_pelet", label: "Santet Pelet" },
    { value: "santet_kuantum_entanglement", label: "Santet Kuantum Entanglement" },
    { value: "santet_guna_guna", label: "Santet Guna-guna" },
    { value: "santet_teluh", label: "Santet Teluh" },
];

const formFields = [
  {
    name: "namaPenyihir",
    label: "Nama Penyihir",
    placeholder: "Nama Anda",
    description: "Nama yang akan digunakan untuk melancarkan santet.",
  },
  {
    name: "namaTarget",
    label: "Nama Target",
    placeholder: "Nama target",
    description: "Nama orang yang akan disantet.",
  },
];

type SantetFormProps = {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  isLoading: boolean;
};

export function SantetForm({ onSubmit, isLoading }: SantetFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      namaPenyihir: "",
      namaTarget: "",
      isPermanent: false,
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Form Santet Digital</CardTitle>
        <CardDescription>
          Lancarkan kutukan digital Anda di sini!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {formFields.map((field) => (
              <FormField
                key={field.name}
                control={form.control}
                name={field.name as "namaPenyihir" | "namaTarget"}
                render={({ field: formField }) => (
                  <FormItem>
                    <FormLabel>{field.label}</FormLabel>
                    <FormControl>
                      <Input placeholder={field.placeholder} {...formField} />
                    </FormControl>
                    <FormDescription>{field.description}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <FormField
              control={form.control}
              name="jenisSantet"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jenis Santet</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih jenis santet" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {jenisSantetOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Pilih metode santet digital favorit Anda.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isPermanent"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Santet Permanen</FormLabel>
                    <FormDescription>
                      Aktifkan untuk kutukan digital abadi.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Melancarkan Santet...
                </>
              ) : (
                <>
                  <Zap className="mr-2 h-4 w-4" />
                  Lancarkan Santet
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

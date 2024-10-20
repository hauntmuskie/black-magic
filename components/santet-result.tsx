import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Markdown from 'react-markdown'

type SantetResultProps = {
  result: string;
};

export function SantetResult({ result }: SantetResultProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hasil Santet</CardTitle>
        <CardDescription>
          Lihat efek santet digital Anda di sini!
        </CardDescription>
      </CardHeader>
      <CardContent>
        {result ? (
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-lg">
                <Markdown className={'prose dark:text-white'}>{result}</Markdown>
            </p>
          </div>
        ) : (
          <p className="text-muted-foreground">
            Hasil santet akan muncul di sini setelah Anda melancarkan kutukan.
          </p>
        )}
      </CardContent>
    </Card>
  );
}

import MainChart from "@/components/dashboard/MainChart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function page() {
    return (
        <main className="px-6 md:px-20 lg:px-32 py-10 grid gap-7">
            <form className="grid gap-3 px-4 py-4 border-border border rounded-lg">
                <div className="mb-2">
                    <h2 className="text-lg">Short Link</h2>
                    <p className="text-sm text-muted-foreground">short your link in seconds.</p>
                </div>
                <Label htmlFor="url">Your URL</Label>
                <Input placeholder="https://example.com/dfghj.." name="url" />
                <Label htmlFor="alias">Alias <span className="text-xs text-muted-foreground">(optional)<span className="text-blue-400">*</span></span></Label>
                <Input placeholder="somethi.." name="alias" />
                <Button variant="shine" className="mt-3">Shorten</Button>
            </form>

            <div className="grid gap-4 px-4 py-4 border-border border rounded-lg">
                <div>
                    <h2 className="text-lg">Recent Links</h2>
                    <p className="text-sm text-muted-foreground">list of yout recently shortened links.</p>
                </div>
                <div className="h-40 grid place-content-center border border-dashed border-border rounded-lg">
                    <p className="text-center text-sm text-muted-foreground">No links yet</p>
                </div>
            </div>

            <div>
                <MainChart />
            </div>
        </main>
    )
}
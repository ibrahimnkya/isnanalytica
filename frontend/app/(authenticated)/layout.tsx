import { AppSidebar } from '@/components/app-sidebar';
import { Navbar } from '@/components/Navbar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import SupportButton from '@/components/SupportButton';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <div className="flex flex-1 flex-col overflow-hidden">
                    <Navbar />
                    <main className="flex-1 overflow-y-auto p-4 md:p-8 mesh-bg">
                        {children}
                    </main>
                </div>
            </SidebarInset>
            <SupportButton />
        </SidebarProvider>
    );
}

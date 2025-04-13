import { Separator } from "@/components/ui/separator";

type OverviewLayoutProps = {
	children: React.ReactNode;
	main: React.ReactNode;
	steps: React.ReactNode;
};

export default function OverviewLayout({
	children,
	main,
	steps,
}: OverviewLayoutProps) {
	return (
		<div className="flex flex-1 w-full">
			<div className="w-1/6">{steps}</div>

			<Separator orientation="vertical" />

			<div className="w-2/3">{main}</div>

			<Separator orientation="vertical" />

			<div className="w-1/3">{children}</div>
		</div>
	);
}

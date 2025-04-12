export function WorkspaceWrapper({ children }: { children: React.ReactNode }) {
	return (
		<main className="flex-1 overflow-auto">
			<div className="px-4 py-6 lg:px-16">{children}</div>
		</main>
	);
}

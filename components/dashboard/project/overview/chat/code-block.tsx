"use client";

interface CodeBlockProps {
	inline: boolean;
	className: string;

	/* eslint-disable @typescript-eslint/no-explicit-any */
	// biome-ignore lint/suspicious/noExplicitAny: ReactMarkdown passes content as any
	children: any;
	/* eslint-enable @typescript-eslint/no-explicit-any */
}

export function CodeBlock({
	inline,
	className,
	children,
	...props
}: CodeBlockProps) {
	if (!inline) {
		return (
			<div className="not-prose flex flex-col">
				<pre
					{...props}
					className={
						"text-sm w-full overflow-x-auto dark:bg-zinc-900 p-4 border border-zinc-200 dark:border-zinc-700 rounded-xl dark:text-zinc-50 text-zinc-900"
					}
				>
					<code className="whitespace-pre-wrap break-words">{children}</code>
				</pre>
			</div>
		);
	}

	return (
		<code
			className={`${className} text-sm bg-zinc-100 dark:bg-zinc-800 py-0.5 px-1 rounded-md`}
			{...props}
		>
			{children}
		</code>
	);
}

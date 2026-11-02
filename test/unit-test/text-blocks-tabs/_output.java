class KlassSourceCodeHtmlGenerator
{
	String html()
	{
		// language=HTML
		var prefix = """
			<html>
				<head> </head>
			</html>
			""";

		var plain = """
			first
				second
			""";

		String text = condition
			? """
				yes
				"""
			: "no";

		return """
			Hello %s
			""".formatted(name);
	}
}

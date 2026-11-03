class AnnotatedHeaders
{
    void loop()
    {
        for (@Nullable String s : items)
        {
        }
        for (@Foo int i = 0; i < n; i++)
        {
        }
        try (@Cleanup var r = open())
        {
        }
    }
}

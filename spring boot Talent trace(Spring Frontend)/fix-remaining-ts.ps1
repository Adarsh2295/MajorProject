# Script to fix remaining TypeScript syntax
$rootPath = "C:\Users\Administrator\Desktop\ProjrctDotnetSpringkaCopy\Job_Portal_Application\Frontend\my-react-app\src"

# Get all JS and JSX files
Get-ChildItem -Path $rootPath -Recurse -Include "*.js", "*.jsx" | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    $originalContent = $content
    
    # Fix useState with generic types
    $content = $content -replace 'useState<[^>]*>\(', 'useState('
    
    # Fix more complex type annotations like {[key]: string}
    $content = $content -replace ':\s*\{[^}]*\}', ''
    
    # Fix union types in parameters like (value|null)
    $content = $content -replace '\([^)]*\|\s*[^)]*\)', '(value)'
    
    # Fix object destructuring with type annotations
    $content = $content -replace ':\s*\{[^}]*\}', ''
    
    # Clean up extra whitespace and newlines
    $content = $content -replace '\r?\n\s*\r?\n\s*\r?\n', "`r`n`r`n"
    
    # Only write if content changed
    if ($content -ne $originalContent) {
        Set-Content -Path $_.FullName -Value $content -NoNewline
        Write-Host "Fixed remaining TypeScript syntax in $($_.Name)"
    }
}

Write-Host "TypeScript syntax fix complete!"

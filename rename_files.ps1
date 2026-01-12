# UTF-8 인코딩 설정
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

# 파일명 매핑
$mapping = @{
    "구좌읍_최종.json" = "gujwa-uep_final.json"
    "남원읍_최종.json" = "namwon-uep_final.json"
    "대정읍_최종.json" = "daejeong-uep_final.json"
    "서귀포시_최종.json" = "seogwipo-si_final.json"
    "성산읍_최종.json" = "seongsan-uep_final.json"
    "안덕면_최종.json" = "andeok-myeon_final.json"
    "애월읍_최종.json" = "aewol-uep_final.json"
    "조천읍_최종.json" = "jocheon-uep_final.json"
    "중문_최종.json" = "jungmun_final.json"
    "표선면_최종.json" = "pyoseon-myeon_final.json"
    "한경면_최종.json" = "hangyeong-myeon_final.json"
    "한림읍_최종.json" = "hallim-uep_final.json"
}

$dataDir = "src\data"

# 파일명 변경
foreach ($oldName in $mapping.Keys) {
    $newName = $mapping[$oldName]
    $oldPath = Join-Path $dataDir $oldName
    $newPath = Join-Path $dataDir $newName
    
    if (Test-Path $oldPath) {
        Rename-Item -LiteralPath $oldPath -NewName $newName -ErrorAction SilentlyContinue
        if ($?) {
            Write-Host "Renamed: $oldName -> $newName"
        } else {
            Write-Host "Failed to rename: $oldName"
        }
    } else {
        Write-Host "File not found: $oldName"
    }
}

Write-Host "Done!"


const fs = require('fs');
const path = require('path');

// 파일명 매핑
const fileMapping = {
  "구좌읍_최종.json": "gujwa-uep_final.json",
  "남원읍_최종.json": "namwon-uep_final.json",
  "대정읍_최종.json": "daejeong-uep_final.json",
  "서귀포시_최종.json": "seogwipo-si_final.json",
  "성산읍_최종.json": "seongsan-uep_final.json",
  "안덕면_최종.json": "andeok-myeon_final.json",
  "애월읍_최종.json": "aewol-uep_final.json",
  "조천읍_최종.json": "jocheon-uep_final.json",
  "중문_최종.json": "jungmun_final.json",
  "표선면_최종.json": "pyoseon-myeon_final.json",
  "한경면_최종.json": "hangyeong-myeon_final.json",
  "한림읍_최종.json": "hallim-uep_final.json",
};

const dataDir = path.join(__dirname, "src", "data");

// 파일명 변경
for (const [oldName, newName] of Object.entries(fileMapping)) {
  const oldPath = path.join(dataDir, oldName);
  const newPath = path.join(dataDir, newName);
  
  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, newPath);
    console.log(`Renamed: ${oldName} -> ${newName}`);
  } else {
    console.log(`File not found: ${oldName}`);
  }
}

console.log("Done!");


import { existsSync, writeFileSync, readFileSync, createReadStream } from 'fs';
import { join } from 'path';
import { Data } from './constant/index.js';
import { Party } from './enum/index.js';
const random = (start, end) => {
	return Math.floor(Math.random() * (end - start + 1) + start);
};
const cwd = process.cwd();
import exampleConfig from './gameConfig.example.js';
const exampleConfigPath = cwd + '/plugins/commands/cache/masoi/gameConfig.example.js';
const configPath = join(cwd + '/werewolfConfig.js');
if (!existsSync(configPath)) {
	writeFileSync(configPath, readFileSync(exampleConfigPath));
	global.restart();
}
// import cfg from configPath;
export const gameConfig = { ...exampleConfig, ...import(configPath).then(data => data) };

export const symbols = {
	0: '𝟬',
	1: '𝟭',
	2: '𝟮',
	3: '𝟯',
	4: '𝟰',
	5: '𝟱',
	6: '𝟲',
	7: '𝟳',
	8: '𝟴',
	9: '𝟵'
};

for (let i = 10; i <= 1000; i++) {
	let number = i;
	symbols[i] = '';
	while (number > 0) {
		symbols[i] = symbols[number % 10] + symbols[i];
		number = Math.floor(number / 10);
	}
}

export const randomItem = arr => {
	return arr[random(0, arr.length - 1)];
};

export const dataSetup = setup => {
	const roles = [];
	for (let role in setup.roles) {
		roles.push(...new Array(setup.roles[role]).fill(role));
	}
	return {
		name: setup.name,
		roles,
		org: setup
	};
};

export const vietsub = (role) => {
	role = role.toLowerCase();
	role = role.replace('villager', 'Dân làng')
		.replace('werewolf', 'Ma sói')
		.replace('mayor', 'Thị trưởng')
		.replace('diseased', 'Người bệnh')
		.replace('apprentice', 'Tiên tri tập sự')
		.replace('minion', 'Kẻ phản bội')
		.replace('bodyguard', 'Bảo vệ')
		.replace('cupid', 'Thần tình yêu')
		.replace('evilseer', 'Evilseer')
		.replace('fruitbrute', 'Sói ăn chay')
		.replace('goodseer', 'Tiên tri')
		.replace('hunter', 'Thợ săn')
		.replace('investigator', 'Thám tử')
		.replace('lycan', 'Người sói')
		.replace('oldman', 'Ông già')
		.replace('tanner', 'Chán đời')
		.replace('witch', 'Phù thủy')
		.replace('neutral', 'Trung lập')
		.replace('pacifist', 'Người hòa bình')
	return role.toUpperCase();
}

export const guide = role => {
	const roleName = role.constructor.name;
	const { party, description, advice, image } = Data[roleName];
	let partyName;
	for (partyName in Party) if (party == Party[partyName]) break;
	return (
		{
			body:
				`• BẠN LÀ ${vietsub(roleName)}!\n` +
				`• Phe: ${partyName} (vẫn có thể bị đổi)\n` +
				`• Mô tả: ${description}\n` +
				`• Lời khuyên: ${advice}`,
			attachment: createReadStream(image)
		}
	);
};

// export default {
// 	gameConfig,
// 	symbols,
// 	randomItem,
// 	dataSetup,
// 	guide,
// 	vietsub
// };

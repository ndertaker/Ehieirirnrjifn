import { Party } from '../enum/index.js';
import { validIndex, notSelf, diff } from '../format/index.js';
import Ability from './Ability.js';

export default class Investigator extends Ability {
	static question(player) {
		return (
			'• Vui lòng chọn 3 người trong danh sách 💀: \n' +
			player.world.game.listPlayer() +
			'\n• Hướng dẫn: <người 1><dấu cách><người 2><dấu cách><người 3>. VD: 3 2 1'
		);
	}

	static check(player, value) {
		const trios = value
			.split(' ')
			.slice(0, 3)
			.map(val => player.format(val, validIndex, notSelf));
		if (trios.length != 3) {
			throw new Error('• Vui lòng chọn đủ 3 người!');
		}
		diff(player, trios);
		player.sendMessage(
			`• Bạn đã chọn 3 người: ${trios
				.map(index => player.world.items[index].name)
				.join(', ')}`
		);
		return trios;
	}

	static async nightend(player, trios) {
		if (trios == null) return;
		let rep = `• Trong 3 người chơi: ${trios
			.map(index => player.world.items[index].name)
			.join(', ')}, `;
		const filtered = trios.filter(
			index => player.world.items[index].party != Party.VILLAGER
		);
		rep +=
			filtered.length > 0
				? 'có ít nhất 1 người không phải phe VILLAGER!'
				: 'cả 3 đều là phe VILLAGER!';
		player.sendMessage(rep);
	}
};

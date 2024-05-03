import { validIndex, alive } from '../format/index.js';
import WerewolfGang from '../gang/Werewolf.gang.js';
import Ability from './Ability.js';

export default class Seer extends Ability {
	static question(player) {
		return (
			'• Bạn muốn bảo vệ ai trong danh sách:\n' +
			player.world.game.listPlayer({died: false})
		);
	}

	static check(player, value) {
		const index = player.format(value, validIndex, alive);
		if (player.lastProtectIndex == index) {
			throw new Error('• Bạn không được bảo vệ 2 lần cho cùng 1 người chơi!');
		}
		const {name} = player.world.items[index];
		player.sendMessage(`• Bạn đã chọn bảo vệ ${name}!`);
		return index;
	}

	static async nightend(player, index, listDeaths) {
		if (index == null) return;
		for (let i = 0; i < listDeaths.length; i++) {
			const death = listDeaths[i];
			if (death.index == index && death.killer.constructor == WerewolfGang)
				listDeaths.splice(i--, 1);
		}
		player.lastProtectIndex = index;
	}
};

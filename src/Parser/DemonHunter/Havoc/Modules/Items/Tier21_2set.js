import React from 'react';

import SPELLS from 'common/SPELLS';
import SpellIcon from 'common/SpellIcon';
import SpellLink from 'common/SpellLink';
import { formatNumber } from 'common/format';
import calculateEffectiveDamage from 'Parser/Core/calculateEffectiveDamage';
import ItemDamageDone from 'Interface/Others/ItemDamageDone';

import Analyzer from 'Parser/Core/Analyzer';

const HAVOC_DEMON_HUNTER_T21_2SET_MODIFIER = 0.4;

class Tier21_2set extends Analyzer {
	damageDone = 0;

	constructor(...args) {
    super(...args);
		this.active = this.selectedCombatant.hasBuff(SPELLS.HAVOC_T21_2PC_BONUS.id);
	}

	on_byPlayer_damage(event) {
		const spellId = event.ability.guid;
		if (spellId !== SPELLS.EYE_BEAM_DAMAGE.id) {
			return;
		}
		this.damageDone += calculateEffectiveDamage(event, HAVOC_DEMON_HUNTER_T21_2SET_MODIFIER);
	}

	item() {
		return {
			id: `spell-${SPELLS.HAVOC_T21_2PC_BONUS.id}`,
			icon: <SpellIcon id={SPELLS.HAVOC_T21_2PC_BONUS.id} />,
			title: <SpellLink id={SPELLS.HAVOC_T21_2PC_BONUS.id} icon={false} />,
			result: (
				<dfn data-tip={`Total Damage: ${formatNumber(this.damageDone)}`}>
					<ItemDamageDone amount={this.damageDone} />
				</dfn>
			),
		};
	}
}

export default Tier21_2set;

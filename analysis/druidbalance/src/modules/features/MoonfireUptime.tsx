import { t } from '@lingui/macro';
import { formatPercentage } from 'common/format';
import SPELLS from 'common/SPELLS';
import { SpellLink } from 'interface';
import UptimeIcon from 'interface/icons/Uptime';
import Analyzer from 'parser/core/Analyzer';
import { ThresholdStyle, When } from 'parser/core/ParseResults';
import Enemies from 'parser/shared/modules/Enemies';
import BoringSpellValueText from 'parser/ui/BoringSpellValueText';
import Statistic from 'parser/ui/Statistic';
import STATISTIC_ORDER from 'parser/ui/STATISTIC_ORDER';

class MoonfireUptime extends Analyzer {
  get suggestionThresholds() {
    const moonfireUptime =
      this.enemies.getBuffUptime(SPELLS.MOONFIRE_DEBUFF.id) / this.owner.fightDuration;
    return {
      actual: moonfireUptime,
      isLessThan: {
        minor: 0.95,
        average: 0.9,
        major: 0.8,
      },
      style: ThresholdStyle.PERCENTAGE,
    };
  }

  static dependencies = {
    enemies: Enemies,
  };
  protected enemies!: Enemies;

  suggestions(when: When) {
    when(this.suggestionThresholds).addSuggestion((suggest, actual, recommended) =>
      suggest(
        <>
          Your <SpellLink id={SPELLS.MOONFIRE_DEBUFF.id} /> uptime can be improved. Try to pay more
          attention to your Moonfire on the boss.
        </>,
      )
        .icon(SPELLS.MOONFIRE_DEBUFF.icon)
        .actual(
          t({
            id: 'druid.balance.suggestions.moonfire.uptime',
            message: `${formatPercentage(actual)}% Moonfire uptime`,
          }),
        )
        .recommended(`>${formatPercentage(recommended)}% is recommended`),
    );
  }

  statistic() {
    const moonfireUptime =
      this.enemies.getBuffUptime(SPELLS.MOONFIRE_DEBUFF.id) / this.owner.fightDuration;
    return (
      <Statistic position={STATISTIC_ORDER.CORE(4)} size="flexible">
        <BoringSpellValueText spellId={SPELLS.MOONFIRE_DEBUFF.id}>
          <>
            <UptimeIcon /> {formatPercentage(moonfireUptime)} % <small>uptime</small>
          </>
        </BoringSpellValueText>
      </Statistic>
    );
  }
}

export default MoonfireUptime;

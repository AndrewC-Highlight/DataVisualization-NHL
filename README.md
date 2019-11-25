# Project 1

## Data Analyzed
Analyzed two different data sets. 
Player data was found [here](https://www.rotowire.com/hockey/stats.php?season=2018). Available for non-commercial use. Processed and cleaned in OpenRefine.

Team data was found [here](https://www.hockey-reference.com/leagues/NHL_2019.html#stats::none). Available for student and non-commercial use. Filtered in their own website's tool.

Both sets were manipulated to focus on areas of offense, defense, and overall points record. Not all fields ended up being used (such as special unit stats). The two sets are in the src tab of the project for viewing the finished state.

## How Data Was Incoporated
I used two chart types: bar chart and scatterplots. 

Bar charts were used to directly analyze the hierarchy and relationship between the team or player, and their points. The charts were horizontal to accurately display the highest to lowest relation, and in the team bar chart directly show a cascading order of a team's record.

Scatterplots were used to detail a spread. For example, the team stat of Goals For vs Goals Against was displayed in the scatterplot to display how each team performed in the season and the correlation between the two variables. The tooltip also shows the differential.

Interactivity was mainly done in the form of tooltips that either enhance or dive deeper into the information present on the chart. I did not see the need to update any charts, as each chart was fundamentally showing different data compared to the next.
The main animation used was a highlight animation that I originally used in Assignment 5.

## Further 
If I were to continue the project, I'd probably find a different data set.

But assuming I continue with these two, I'd mainly focus on improved styling and animation. If I could find a way to usefully add animation in a way that highlights specific outliers, it might work well for such instances like the record-tying Tampa Bay Lightning team, or the high amount of goals scored by Alexander Ovechkin.

I would also add in a difference for the playoff teams. I decided against it for now, as I wasn't sure if it would provide a large enough benefit compared to the work (adding a legend, deciding on an extra color for both the bar chart and scatter plot). Definitely something to consider for next time, but playoff clinches weren't a vital part of the story I attempted to tell.

*Some of these were added with the late day. Overall, would still like to improve the styling of the page itself if continued*

## Story
The overall story of the charts is to show how the top teams and players performed in the league. Relationships are loosely established with goal differentials, players with high points, and average age to those teams that would clinch a playoff spot. That said, the correlations are not overwhelmingly easy to detect.

## Challenges
Largest challenge was waiting a bit later than what I should have. Finding a dataset that I wanted was a bit of a time sink and I think the code I wrote ended up being somewhat scalable, but not too sure of the actual quality of it/overall usefulness. Tying together a story was a bit of a challenge as well.

## Magic Numbers
I tried to keep the magic numbers to a minimum, but they still definitely are present, and I didn't see much value in adding another variable to a number that is only used once or twice.


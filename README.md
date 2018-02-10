# OS-Chatten
Chat-funktions riktlinjer
- Använda Bootstrap3
- Parprogrammering
- Daily-StandUp
- [ ] Flödesschema
- [ ] Branches Git
- [x] Wireframes
- [x] Slack-kanal [OS-Chatt]

## GIT Commands
Good to know git commands, Remember to remove any hard bracets.

**Create and alias**
> git config --global alias.[your alias] [git command]

**List all aliases**
> git config --get-regexp alias

**Remove and alias
> git config --global --unset alias.[alias name]

**Total .gitignore process**
>1. vim .gitignore THEN i > .idea/ > esc > :wq<br>
2. rm -rf .idea/ (tar bort .idea directory)<br>
3. git status (för att se om .gitignore är med)<br>
4. git add .gitignore<br>
5. git commit -m".gitignore tillagd"<br>
6. git status<br>
7. git pull (if not up to date)<br>
7. git push

**See all branches**
> git branch OR<br>
git branch -a


**Create and switch to branch locally**
> git checkout -b [name_of_your_branch]


**Move between branches**
> git checkout [name_of_branch]


**First push from new branch**
> git push --set-upstream origin [name_of_branch]


**Locally delete branch**
> git branch -d [name_of_your_branch]

**Git rebase commands (USE CAREFULLY)**
> git rebase master (use if branch is behind master)<br>
When/if conflict -> make correction -> save -> git add <edited_filename><br>
then use: git rebase --continue<br>
to abort rebase: git rebase --abort

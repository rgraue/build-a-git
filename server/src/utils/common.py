def remove_ref_paths(s: str):
    x = s.removeprefix("refs/heads/")
    return x.removeprefix("refs/remotes/")
